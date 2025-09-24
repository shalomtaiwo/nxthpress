    import MenuItemForm from '@/components/MenuItemForm';
    import { createMenuItem } from '../actions';

    export default function NewMenuItemPage() {
    return (
        <div className="prose">
        <h1>New Menu Item</h1>
        <MenuItemForm formAction={createMenuItem} submitLabel="Create" />
        </div>
    );
    }
