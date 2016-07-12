const API_RESOURCE_BASE =
  'http://localhost:3000/api/v1'

export function getResourceUrl(resource) {
  return `${API_RESOURCE_BASE}/${resource}`;
}
