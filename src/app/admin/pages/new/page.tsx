    import PageForm from '@/components/PageForm';
    import { createPage } from '../actions';

    export default function NewPage() {
    return (
        <div className="prose">
        <h1>New Page</h1>
        <PageForm formAction={createPage} submitLabel="Create" />
        </div>
    );
    }
