process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    const reversed = chunk.replace('\n', '').split('').reverse().join('');
    process.stdout.write(`${reversed}\n`);
  }
});
