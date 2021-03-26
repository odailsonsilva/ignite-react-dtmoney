import { useTransations } from '../../hooks/useTransations';
import { Container } from './styles';

export function TransactionsTable() {  
    const { transactions } = useTransations()

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td className={transaction.type}>
                                    {new Intl.NumberFormat('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transaction.amount)}
                                </td>
                                <td>{transaction.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-br')
                                    .format(new Date(transaction.createdAt))}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    )
} 