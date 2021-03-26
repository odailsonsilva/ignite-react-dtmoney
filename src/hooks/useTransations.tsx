import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function createTransaction(transactionInput: TransactionInput) {
      const response = await api.post('/transactions', {
          ...transactionInput,
          createdAt: new Date()
      })

      const { transaction } = response.data

      setTransactions(state => [...state, transaction])
    }

    useEffect(() => {
        api.get('/transactions')
            .then(res => {
                setTransactions(res.data.transactions)
            })
    }, [])

    return (
        <TransactionsContext.Provider value={{
            transactions,
            createTransaction
        }}>
            { children }
        </TransactionsContext.Provider>
    )
}


export function useTransations() {
    const context = useContext(TransactionsContext)

    return context
}