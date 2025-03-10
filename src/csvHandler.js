import Papa from 'papaparse';

//function to fetch a csv from a file
export default async function fetchCSV(path) {
    const data = await fetch(path);
    const reader = data.body.getReader();
    const decoder = new TextDecoder('utf-8');

    return reader.read().then(function(result) {
        const decoded =  decoder.decode(result.value);
        return Papa.parse(decoded);
    });
};