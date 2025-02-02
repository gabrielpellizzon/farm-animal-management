import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class XlsExporterService {
  static exportToXls(filename: string, headers: string[], data: any[]): void {
    if (!data || !data.length) {
      alert('No data to export.');
      return;
    }

    const xlsHeaders = headers.join(';');

    const xlsRows = data.map((row) =>
      headers
        .map((header) => (row[header] !== undefined ? `"${row[header]}"` : ''))
        .join(';')
    );

    const xlsContent = [xlsHeaders, ...xlsRows].join('\n');

    const blob = new Blob([xlsContent], { type: 'text/xls;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `${filename}.xls`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
