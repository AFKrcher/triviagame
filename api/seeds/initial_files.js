
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('files').del()
    .then(function () {
      // Inserts seed entries
      return knex('files').insert([
        {question: 'What is 2 + 2?', answers: '4,1,0,2', title: 'Math'},
        {question: 'What is 11 * 8?', answers: '88,19,3,1.375', title: 'Math'},
        {question: 'What is the square root of 7?', answers: '2.65,2.64,2.63,2.6', title: 'Math'},
        {question: '2x + 5 = 25, Solve for x', answers: '10,30,60,15', title: 'Math'},
        {question: 'The answer to life, the universe, and everything is 42?', answers: 'True,False', title: 'Math'},
        {question: 'What is the capital of Nebraska?', answers: 'Lincoln,Omaha,Norfolk,Des Moines', title: 'State capitals'},
        {question: 'Which capital is known as the Mile High City?', answers: 'Denver,Salt Lake City,Colorado Springs,Florida', title: 'State capitals'},
        {question: 'Which capital has the highest population', answers: 'Phoenix,Boise,Albany,Honolulu', title: 'State capitals'},
      ]);
    });
};
