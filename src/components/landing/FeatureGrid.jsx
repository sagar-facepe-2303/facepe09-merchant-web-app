import FeatureCard from './FeatureCard'

function FeatureGrid({ items }) {
  return (
    <section className="feature-grid" aria-label="Product highlights">
      {items.map((item) => (
        <FeatureCard key={item.id} item={item} />
      ))}
    </section>
  )
}

export default FeatureGrid
