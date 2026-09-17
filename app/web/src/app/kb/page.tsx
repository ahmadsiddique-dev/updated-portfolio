import { Contact } from '@/models/contact.model'
import db from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const dynamic = "force-dynamic";

const page = async () => {
  await db();
  const contacts = await Contact.find().lean()

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight">Contacts Information</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Contacts fetched that were created by AI model
      </p>
      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Name</TableHead>
              <TableHead className="w-55">Contact</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={String(contact._id)}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{String(contact.contact ?? '—')}</TableCell>
                  <TableCell className="max-w-112.5">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block truncate cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                            {contact.summary}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-md p-3 text-xs leading-relaxed border bg-neutral-900 text-white shadow-xl">
                          <p className="whitespace-normal wrap-break-word">{contact.summary}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default page






