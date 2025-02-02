import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvExporterService {
  static exportToCsv(filename: string, headers: string[], data: any[]): void {
    if (!data || !data.length) {
      alert('No data to export.');
      return;
    }

    const csvHeaders = headers.join(';');

    const csvRows = data.map((row) =>
      headers
        .map((header) => (row[header] !== undefined ? `"${row[header]}"` : ''))
        .join(';')
    );

    const csvContent = [csvHeaders, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
