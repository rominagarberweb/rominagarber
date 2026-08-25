export const defaultGateWhy =
  'This page is exclusive. Enter the password you were given to view it.'
export const defaultGateUnlocks =
  'Once you unlock it, you can read the full page and use any downloads within.'
export const defaultGateHelp = "Don't have the password? Reach out to Romina on social."

const fallbacks = {
  gateWhy: defaultGateWhy,
  gateUnlocks: defaultGateUnlocks,
  gateHelp: defaultGateHelp
}

export function initialGateCopy (field) {
  const fallback = fallbacks[field]
  return async (_params, context) => {
    const getClient = context && context.getClient
    if (typeof getClient !== 'function') return fallback
    const client = getClient({apiVersion: '2023-08-01'})
    const value = await client.fetch(`*[_id == "siteSettings"][0].${field}`)
    return typeof value === 'string' && value.trim() ? value : fallback
  }
}
