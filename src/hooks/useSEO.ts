import { useEffect } from 'react';

export interface SEOOptions {
  image?: string;
  canonicalPath?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export function useSEO(
  title: string, 
  description: string, 
  imageOrOptions?: string | SEOOptions
) {
  useEffect(() => {
    const fullTitle = title.includes('ContractorStack') ? title : `${title} | ContractorStack`;
    document.title = fullTitle;

    const options: SEOOptions = typeof imageOrOptions === 'string' 
      ? { image: imageOrOptions } 
      : (imageOrOptions || {});
    
    // Primary Meta Tags
    updateMeta('name', 'description', description);

    // Open Graph / Facebook
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:title', fullTitle);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:site_name', 'ContractorStack');
    
    const canonicalUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${options.canonicalPath || window.location.pathname}` 
      : '';
    if (canonicalUrl) {
      updateMeta('property', 'og:url', canonicalUrl);
      updateLink('canonical', canonicalUrl);
    }

    if (options.image) {
      updateMeta('property', 'og:image', options.image);
      updateMeta('property', 'twitter:image', options.image);
    }

    // Twitter
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', fullTitle);
    updateMeta('name', 'twitter:description', description);

    // Schema.org Structured Data (JSON-LD)
    const scriptId = 'contractorstack-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (options.schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(options.schema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, imageOrOptions]);
}

function updateMeta(attr: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}
