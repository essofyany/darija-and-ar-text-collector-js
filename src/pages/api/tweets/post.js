const Twitter = require('twitter');
import axios from 'axios';
import { Agent } from 'https';
import { Cleaner } from '../../../utils/Cleaner';
import { unifyArray } from '../../../utils/unifyArray';

export default async function handler(req, res) {
	const regex =
		/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

	try {
		if (req.method === 'POST') {
			const {
				body: { q = 'سلام', lang = 'ar', screen_name },
			} = req;

			// Process a POST request
			// const client = new Twitter({
			// 	consumer_key: process.env.CONSUMER_KEY,
			// 	consumer_secret: process.env.CONSUMER_SECRET,
			// 	access_token_key: process.env.ACCESS_TOKEN_KEY,
			// 	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
			// });
			// console.log("params", q, lang, screen_name);
			const { data: searchData } = await axios.get(
				`${
					process.env.TWITTER_API_URL
				}/search/tweets.json?q=${encodeURIComponent(q)}&lang=${lang}`,
				{
					httpsAgent: new Agent({ rejectUnauthorized: false }),
					headers: {
						Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
						'User-Agent': 'v2TweetLookupJS',
					},
				},
			);
			// fetching tweets from specific user
			// if (screen_name && q.length < 1) {
			// 	const statusesData = await client.get('statuses/user_timeline.json', {
			// 		screen_name,
			// 		count: 200,
			// 	});
			// 	const usefullStatusesData = statusesData
			// 		.map((item) => {
			// 			const cleaner = new Cleaner(item.text);
			// 			return {
			// 				tweetId: item.id,
			// 				author: item.user.screen_name,
			// 				text: cleaner.cleanOrder_1(),
			// 				createdAt: item.created_at,
			// 				lang: item.lang,
			// 			};
			// 		})
			// 		.filter((item) => item.lang === lang);

			// 	// console.log("screen_name");
			// 	return res.status(200).json({
			// 		message: 'data fetched :)',
			// 		body: usefullStatusesData,
			// 	});
			// }

			// fetching tweets using keywords or username

			const usefulSearchData = searchData.statuses.map((item) => {
				const cleaner = new Cleaner(item.text);
				return {
					tweetId: item.id,
					author: item.user.screen_name,
					text: cleaner.cleanOrder_1(),
					createdAt: item.created_at,
					lang: item.lang,
				};
			});

			const unifiedUsefulSearchData = unifyArray(usefulSearchData);
			// console.log("q");

			return res.status(200).json({
				message: 'data fetched :)',
				body: unifiedUsefulSearchData,
			});

			// if (screen_name && q) {
			// 	const statusesData = await client.get('statuses/user_timeline.json', {
			// 		screen_name,
			// 		count: 200,
			// 		// trim_user: false,
			// 		// exclude_replies: false,
			// 		// include_rts: false,
			// 	});

			// 	const usefullStatusesData = statusesData
			// 		.map((item) => {
			// 			const cleaner = new Cleaner(item.text);
			// 			return {
			// 				tweetId: item.id,
			// 				author: item.user.screen_name,
			// 				text: cleaner.cleanOrder_1(),
			// 				createdAt: item.created_at,
			// 				lang: item.lang,
			// 			};
			// 		})
			// 		.filter((item) => item.lang === lang);

			// 	const searchData = await client.get('search/tweets.json', {
			// 		q,
			// 		lang,
			// 		count: 100,
			// 	});

			// 	const usefulSearchData = searchData.statuses.map((item) => {
			// 		const cleaner = new Cleaner(item.text);
			// 		return {
			// 			tweetId: item.id,
			// 			author: item.user.screen_name,
			// 			text: cleaner.cleanOrder_1(),
			// 			createdAt: item.created_at,
			// 			lang: item.lang,
			// 		};
			// 	});

			// 	const unifiedUsefulSearchData = unifyArray(usefulSearchData);

			// 	const dataset = unifiedUsefulSearchData.concat(usefullStatusesData);

			// 	// console.log("screen_name && q");

			// 	return res.status(200).json({
			// 		message: 'data fetched :)',
			// 		body: dataset,
			// 	});
			// }

			// res.status(200).json({
			// 	message: 'no data found :(',
			// 	body: [],
			// });
		}
	} catch (error) {
		res.status(400).json({
			message: 'something went wrong !!',
		});
		console.log(error);
	}
}
