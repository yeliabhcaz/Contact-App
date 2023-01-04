import { redirect } from 'react-router-dom'

import { deleteContact } from '../contacts';

export async function action({ params }) {
    await deleteContact(params.contactId);
    return redirect('/')
}

export default function DestroyContact() {
    <Typography variant='h1'>
        Contact has been deleted
    </Typography>
}