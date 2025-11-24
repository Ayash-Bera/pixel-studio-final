import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEOHead = ({ meta, schema }) => {
  return (
    <>
      <Helmet>
        {/* Title */}
        <title>{meta.title}</title>

        {/* Standard Meta Tags */}
        <meta name="description" content={meta.description} />
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={meta.openGraph.type} />
        <meta property="og:url" content={meta.openGraph.url} />
        <meta property="og:title" content={meta.openGraph.title} />
        <meta
          property="og:description"
          content={meta.openGraph.description}
        />
        <meta property="og:image" content={meta.openGraph.image} />
        <meta property="og:site_name" content={meta.openGraph.siteName} />
        <meta property="og:locale" content={meta.openGraph.locale} />

        {/* Twitter */}
        <meta name="twitter:card" content={meta.twitter.card} />
        <meta name="twitter:url" content={meta.twitter.url} />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        <meta name="twitter:image" content={meta.twitter.image} />
        {meta.twitter.site && (
          <meta name="twitter:site" content={meta.twitter.site} />
        )}

        {/* JSON-LD Structured Data */}
        {schema && Array.isArray(schema) ? (
          schema.map((s, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        ) : schema ? (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        ) : null}
      </Helmet>
    </>
  );
};

SEOHead.propTypes = {
  meta: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string,
    canonical: PropTypes.string.isRequired,
    openGraph: PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      siteName: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
    }).isRequired,
    twitter: PropTypes.shape({
      card: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      site: PropTypes.string,
    }).isRequired,
  }).isRequired,
  schema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default SEOHead;
