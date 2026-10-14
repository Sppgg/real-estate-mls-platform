import emblem from '../assets/img/eg-sp-emblem.webp';
import '../styles/brandLogo.css';

function BrandLogo({ compact = false }) {
  return (
    <span
      className={`brand-logo${compact ? ' brand-logo--compact' : ''}`}
      role="img"
      aria-label="Elizabeth González and Sara del Pozo Real Estate"
    >
      <img className="brand-logo__emblem" src={emblem} alt="" width="64" height="64" />
      <span className="brand-logo__wordmark" aria-hidden="true">
        <span className="brand-logo__name">Elizabeth González</span>{' '}
        <span className="brand-logo__name">and Sara del Pozo</span>{' '}
        <span className="brand-logo__descriptor">Real Estate</span>
      </span>
    </span>
  );
}

export default BrandLogo;
