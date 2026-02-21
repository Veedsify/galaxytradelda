import { Badge } from '@/components/ui/badge';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type ReturnStatus = 'pending' | 'approved' | 'rejected' | 'completed';

const orderStatusClass: Record<OrderStatus, string> = {
    pending:    'bg-amber-100 text-amber-800 border-amber-300',
    processing: 'bg-blue-100 text-blue-800 border-blue-300',
    shipped:    'bg-indigo-100 text-indigo-800 border-indigo-300',
    delivered:  'bg-green-100 text-green-800 border-green-300',
    cancelled:  'bg-red-100 text-red-800 border-red-300',
};

const orderStatusLabel: Record<OrderStatus, string> = {
    pending:    'Pending',
    processing: 'Processing',
    shipped:    'Shipped',
    delivered:  'Delivered',
    cancelled:  'Cancelled',
};

const returnStatusClass: Record<ReturnStatus, string> = {
    pending:   'bg-amber-100 text-amber-800 border-amber-300',
    approved:  'bg-blue-100 text-blue-800 border-blue-300',
    rejected:  'bg-red-100 text-red-800 border-red-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
};

const returnStatusLabel: Record<ReturnStatus, string> = {
    pending:   'Pending',
    approved:  'Approved',
    rejected:  'Rejected',
    completed: 'Completed',
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    return (
        <Badge className={orderStatusClass[status]}>
            {orderStatusLabel[status]}
        </Badge>
    );
}

export function ReturnStatusBadge({ status }: { status: ReturnStatus }) {
    return (
        <Badge className={returnStatusClass[status]}>
            {returnStatusLabel[status]}
        </Badge>
    );
}
