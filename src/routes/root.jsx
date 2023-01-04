import { Box, Typography, TextField, Button } from '@mui/material';
import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation } from 'react-router-dom';

import { createContact, getContacts } from '../contacts'

export async function loader() {
    const contacts = await getContacts();
    return { contacts }
}

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
    const { contacts } = useLoaderData();
    const NAVIGATION = useNavigation();

    return (
        <>
            <Box id='sidebar'>
                <Typography variant='h1'>React Router Contacts</Typography>
                <Box>
                    <Form id='search-form' role='search'>
                            <TextField 
                                id="q" 
                                aria-label="Search Contacts" 
                                variant="outlined" 
                                type='search' 
                                name='q'
                            />
                            <Box id='search-spinner' aria-hidden hidden={true} />
                            <Box className='sr-only' aria-live='polite' />
                    </Form>
                    <Form method='post'>
                        <Button type='submit'>New</Button>
                    </Form>
                </Box>
                <nav>
                    {contacts.length ? (
                    <ul>
                        {contacts.map(contact => (
                            <li key={contact.id}>
                                <NavLink 
                                    to={`contacts/${contact.id}`}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                        ? "active"
                                        : isPending
                                        ? "pending"
                                        : ""
                                    }
                                >
                                    {contact.first || contact.last ? (
                                        <>
                                            {contact.first} {contact.last}
                                        </>
                                    ): (
                                        <Typography variant='subtitle' sx={{fontStyle: 'italic'}}>No Name</Typography>
                                    )} {" "}
                                    {contact.favorite && <span>★</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    ): (
                        <Typography variant='subtitle' sx={{fontStyle: 'italic'}}>No Contacts</Typography>
                    )}
                </nav>
            </Box>
            <Box 
                id='detail'
                className={
                    NAVIGATION.state === 'loading' ? 'loading' : ""
                }
            >
                <Outlet />
            </Box>
        </>
    )

}