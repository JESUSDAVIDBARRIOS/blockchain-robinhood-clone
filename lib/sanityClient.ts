import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '45h5dhxp',
  dataset: 'production',
  apiVersion: 'v1',
  token: 'skV7EjsRUf4H91T28rQmo0KycLx7opbmcQf5Ua1WDTfVO1YoEXJ2jEnzVLKdGFSTVynpJzOFmpkCE47Ljzspqvv6EdvJqoiGAlmk5zvz7svmEZJqY05obPmIB3CnyAVAxYZ7LDSqkkjMlDeEsEl3kMcWA4Vj96U5u6kn0acpZcwU024pZhJr',
  useCdn: false,
})