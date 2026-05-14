import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileThunk, uploadLogoThunk } from '../../features/profile/profileSlice'
import { profileService } from '../../api/services/profileService'
import { parseApiError } from '../../utils/errorParser'
import { toast } from '../../utils/toast'

const EMPTY_FORM = {
  businessName: '',
  type: '',
  taxId: '',
  website: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  zip: '',
  country: '',
}

const MAX_LOGO_BYTES = 2 * 1024 * 1024 // 2MB
const ALLOWED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/webp']

// Map API profile shape → form fields
const profileToForm = (p = {}) => ({
  businessName: p.business_name || p.businessName || '',
  type: p.type || '',
  taxId: p.tax_id || p.taxId || '',
  website: p.website || '',
  email: p.email || '',
  phone: p.mobile_number || p.phone || '',
  city: p.city || '',
  state: p.state || '',
  zip: p.zip || '',
  country: p.country || '',
})

function MerchantProfileForm() {
  const dispatch = useDispatch()
  const { data: profile, loading } = useSelector((s) => s.profile)
  const fileInputRef = useRef(null)
  const [avatar, setAvatar] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Fetch on mount if missing
  useEffect(() => {
    if (!profile) dispatch(fetchProfileThunk())
  }, [dispatch, profile])

  // Hydrate form when profile loads/changes
  useEffect(() => {
    if (profile) {
      setForm(profileToForm(profile))
      setAvatar(profile.logo_url || profile.avatarUrl || null)
    }
  }, [profile])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      toast.error('Logo must be PNG, JPEG or WebP.')
      return
    }
    if (file.size > MAX_LOGO_BYTES) {
      toast.error('Logo must be 2MB or smaller.')
      return
    }

    // Optimistic preview while uploading
    const reader = new FileReader()
    reader.onload = (ev) => setAvatar(ev.target.result)
    reader.readAsDataURL(file)

    setUploading(true)
    try {
      const result = await dispatch(uploadLogoThunk(file)).unwrap()
      if (result?.logo_url) setAvatar(result.logo_url)
      toast.success('Logo updated.')
    } catch (err) {
      toast.error(err?.message || 'Failed to upload logo.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => setAvatar(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await profileService.updateProfile({
        business_name: form.businessName,
        type: form.type,
        tax_id: form.taxId,
        website: form.website,
        email: form.email,
        mobile_number: form.phone,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      })
      // Refresh profile in store
      dispatch(fetchProfileThunk())
      toast.success('Profile updated.')
    } catch (err) {
      toast.error(parseApiError(err).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="merchant-profile-card" onSubmit={handleSubmit}>
      <div className="profile-image-section">
        <h3 className="profile-image-title">Profile Image Section</h3>
        <div className="profile-image-row">
          <div className="profile-avatar">
            {avatar ? (
              <img src={avatar} alt="Profile avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#0071DC" />
                  <g fill="#FFC220">
                    <circle cx="20" cy="20" r="3" />
                    <rect x="18.5" y="7" width="3" height="8" rx="1.5" />
                    <rect x="18.5" y="25" width="3" height="8" rx="1.5" />
                    <rect x="7" y="18.5" width="8" height="3" rx="1.5" />
                    <rect x="25" y="18.5" width="8" height="3" rx="1.5" />
                    <rect x="10" y="10" width="3" height="8" rx="1.5" transform="rotate(-45 10 10)" />
                    <rect x="24" y="24" width="3" height="8" rx="1.5" transform="rotate(-45 24 24)" />
                    <rect x="30" y="10" width="3" height="8" rx="1.5" transform="rotate(45 30 10)" />
                    <rect x="16" y="24" width="3" height="8" rx="1.5" transform="rotate(45 16 24)" />
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="profile-image-actions">
            <button type="button" className="upload-new-btn" onClick={handleUploadClick} disabled={uploading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 10.667V2m0 0L4.667 5.333M8 2l3.333 3.333M2 10.667V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.333" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {uploading ? 'Uploading…' : 'Upload New Image'}
            </button>
            {avatar && (
              <button type="button" className="remove-logo-btn" onClick={handleRemove}>
                Remove Logo
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-form-grid">
        <div className="form-field">
          <label className="form-label">Business name <span className="required">*</span></label>
          <input className="form-input" value={form.businessName} onChange={handleChange('businessName')} />
          <span className="form-hint">Full name not needed.</span>
        </div>
        <div className="form-field">
          <label className="form-label">Type <span className="required">*</span></label>
          <input className="form-input" value={form.type} onChange={handleChange('type')} />
        </div>

        <div className="form-field">
          <label className="form-label">Tax ID <span className="required">*</span></label>
          <input className="form-input" value={form.taxId} onChange={handleChange('taxId')} />
        </div>
        <div className="form-field">
          <label className="form-label">Website <span className="required">*</span></label>
          <input className="form-input" value={form.website} onChange={handleChange('website')} />
        </div>

        <div className="form-field">
          <label className="form-label">Business email <span className="required">*</span></label>
          <input className="form-input" value={form.email} onChange={handleChange('email')} />
        </div>
        <div className="form-field">
          <label className="form-label">Phone number <span className="required">*</span></label>
          <div className="phone-input-wrapper">
            <span className="phone-flag">🇮🇳 <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <input className="form-input phone-input" value={form.phone} onChange={handleChange('phone')} />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">City</label>
          <input className="form-input" value={form.city} onChange={handleChange('city')} />
        </div>
        <div className="form-field">
          <label className="form-label">State / Province</label>
          <input className="form-input" value={form.state} onChange={handleChange('state')} />
        </div>

        <div className="form-field">
          <label className="form-label">ZIP / Postal Code</label>
          <input className="form-input" value={form.zip} onChange={handleChange('zip')} />
        </div>
        <div className="form-field">
          <label className="form-label">Country</label>
          <input className="form-input" value={form.country} onChange={handleChange('country')} />
        </div>
      </div>

      <div className="settings-form-footer">
        <button type="submit" className="update-details-btn" disabled={submitting || loading}>
          {submitting ? 'Saving…' : 'Update Details'}
        </button>
      </div>
    </form>
  )
}

export default MerchantProfileForm
