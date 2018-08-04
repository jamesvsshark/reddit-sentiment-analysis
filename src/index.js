import _ from 'lodash';
import request from 'request';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

const redditUserName = 'jamesvsshark';
let redditUserCommentsAPI = `https://www.reddit.com/user/${redditUserName}/comments.json`;

request(redditUserCommentsAPI, (err, res, body) => {
    const resp = JSON.parse(body);
    const scoredComments = resp.data.children.map(c => {
        console.log('Examining: ', c.data.body);
        const analysis = sentiment.analyze(c.data.body);
        console.log('Which analysed as: \n', analysis);
        console.log('\n');
        return analysis.score;
    });

    console.log('SCORE : ', (_.sum(scoredComments)) / scoredComments.length)
});