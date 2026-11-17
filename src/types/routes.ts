export type AppRoute =
  | { page: 'home' }
  | { page: 'provisions' }
  | { page: 'pantry' }
  | { page: 'product'; productId: string }
  | { page: 'catering' }
  | { page: 'provenance' }
  | { page: 'contact' }
  | { page: 'login' }
  | { page: 'admin' };

export function parseHashToRoute(hash: string): AppRoute {
  const cleaned = hash.replace(/^#\/?/, '').trim();
  if (!cleaned) return { page: 'home' };
  if (cleaned === 'provisions') return { page: 'provisions' };
  if (cleaned === 'pantry') return { page: 'pantry' };
  if (cleaned === 'catering') return { page: 'catering' };
  if (cleaned === 'provenance') return { page: 'provenance' };
  if (cleaned === 'contact') return { page: 'contact' };
  if (cleaned === 'login') return { page: 'login' };
  if (cleaned === 'admin') return { page: 'admin' };
  if (cleaned.startsWith('product/')) {
    const productId = cleaned.slice('product/'.length).trim();
    if (productId) return { page: 'product', productId };
  }
  return { page: 'home' };
}

export function routeToHash(route: AppRoute): string {
  switch (route.page) {
    case 'home':
      return '#/';
    case 'provisions':
      return '#/provisions';
    case 'pantry':
      return '#/pantry';
    case 'product':
      return `#/product/${route.productId}`;
    case 'catering':
      return '#/catering';
    case 'provenance':
      return '#/provenance';
    case 'contact':
      return '#/contact';
    case 'login':
      return '#/login';
    case 'admin':
      return '#/admin';
  }
}
