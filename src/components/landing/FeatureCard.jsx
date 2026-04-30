import FeatureIcon from './FeatureIcon'

function FeatureCard({ item }) {
  return (
    <article className={`feature-card${item.highlighted ? ' feature-card--highlight' : ''}`}>
      <FeatureIcon type={item.icon} />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </article>
  )
}

export default FeatureCard
