import { MongoClient } from 'mongodb'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const dynamic = "force-dynamic";

const page = async () => {
  const db = await MongoClient.connect(process.env.MONGODB_URI || '');
  const contactsCollection = db.db('portfolio').collection('contact');
  const contacts = await contactsCollection.find({}).sort({ createdAt: -1 }).toArray();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight">Contacts Information</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Contacts fetched that were created by AI model
      </p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Name</TableHead>
            <TableHead className="w-56">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                No contacts found.
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
            <TableRow key={JSON.stringify(contact._id)}>
              <TableCell className="font-medium">{String(contact.name ?? contact.fullName ?? '—')}</TableCell>
              <TableCell>{String(contact.contact ?? '—')}</TableCell>
            </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default page






