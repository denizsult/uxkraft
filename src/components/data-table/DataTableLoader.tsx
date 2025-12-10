import { Spinner } from "@/components/ui/spinner";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

interface DataTableLoaderProps {
  columnsCount: number;
}

export function DataTableLoader({ columnsCount }: DataTableLoaderProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={columnsCount} className="h-24 text-center">
          <div className="flex items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
