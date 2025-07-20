import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchViacData(portfolioIndex = 0) {
  const { VIAC_USERNAME, VIAC_PASSWORD, CSRF_TOKEN } = process.env;

  const jar = new CookieJar();
  const client = wrapper(axios.create({
    jar,
    withCredentials: true,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'de',
      'cache-control': 'no-cache, no-store',
      'content-type': 'application/json',
      'expires': '0',
      'pragma': 'no-cache',
      'x-csrft759': CSRF_TOKEN,
      'x-same-domain': '1',
      'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
    }
  }));

  await client.delete('https://app.viac.ch/external-login/public/authentication/flow/');
  await client.post('https://app.viac.ch/external-login/public/authentication/password/check/', {
    username: VIAC_USERNAME,
    password: VIAC_PASSWORD
  });

  const protectedRes = await client.get('https://app.viac.ch/rest/web/wealth/summary');

  const portfolios = Object.values(protectedRes.data.p3aSummary.portfolioWealthSummaries);
  const selectedPortfolio = portfolios[portfolioIndex];

  if (!selectedPortfolio) {
    throw new Error(`Portfolio-Index ${portfolioIndex} existiert nicht.`);
  }

  return selectedPortfolio.dailyWealth;
}

