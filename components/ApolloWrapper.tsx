'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const ApolloWrapper = ({ children }: IProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
