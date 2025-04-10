function generateGitCommands(totalCommits, startDateStr, endDateStr) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      let output = '';

      for (let i = 1; i <= totalCommits; i++) {
            const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
            const randomDate = new Date(randomTime);

            const isoDate = randomDate.toISOString();
            output += `
GIT_AUTHOR_DATE="${isoDate}" GIT_COMMITTER_DATE="${isoDate}" git commit --allow-empty -m "Commit number ${i}"\n`;
      }

      return output;
}

// Example usage:
const gitScript = generateGitCommands(200, '2024-03-10', '2024-04-10');
console.log(gitScript);
