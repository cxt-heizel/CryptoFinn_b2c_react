import { useEffect, useRef } from 'react';
import $ from 'jquery';

declare global {
  interface JQuery {
    cfHeader?: (option?: unknown, ...args: unknown[]) => any;
  }

  interface Window {
    jQuery: typeof $;
    $: typeof $;
  }
}

const PublicHeader = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const ASSET_BASE = 'https://dev-www.cryptofinn.io/assets/component';

  const loadCss = (id: string, href: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.getElementById(id)) return resolve();
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load ${href}`));
      document.head.appendChild(link);
    });

  const loadScript = (id: string, src: string) =>
    new Promise<void>((resolve, reject) => {
      const existing = document.getElementById(id) as HTMLScriptElement | null;
      if (existing) return existing.dataset.loaded === 'true' ? resolve() : existing.addEventListener('load', () => resolve());
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.dataset.loaded = 'false';
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

  useEffect(() => {
    window.jQuery = window.$ = $;
    const element = headerRef.current;
    if (!element) return;
    const $header = $(element);
    let isUnmounted = false;

    // Load remote assets after jQuery is set on window so the UMD build can find it, then init.
    Promise.all([
      loadCss('cf-header-css', `${ASSET_BASE}/CryptofinnHeader.css`),
      loadScript('cf-header-js', `${ASSET_BASE}/CryptofinnHeader.js`),
    ])
      .then(() => {
        if (!isUnmounted) {
          $header.cfHeader?.({
            auth : { 
              showLoginBtn : true, 
              serviceType : 'tax' ,
              loginBtnLink : '/login', 
            } 
          });
        }
      })
      .catch(() => {
        /* ignore load errors */
      });

    return () => {
      isUnmounted = true;
      try {
        $header.cfHeader?.('destroy');
      } catch {
        // ignore teardown errors from plugin
      }
    };
  }, []);

  return <header ref={headerRef} id="site-header" />;
};

export default PublicHeader;
