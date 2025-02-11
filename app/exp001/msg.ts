import { stringify } from 'node:querystring';
import { argentAccountABI } from '../../packages/starkweb/dist/esm/abi/argentAccountABI.js';
import { readContract } from '../../packages/starkweb/dist/esm/actions/public/readContract.js';
import { verifyMessage } from '../../packages/starkweb/dist/esm/actions/public/verifyMessage.js';
import { client } from './index.js';

const message = 'Hello, world!';
const address = '0x034abecf49cedc634d0c3145da7b1caea99d8d4f2da5b5d41e532ea05192d523';
const chainId = '0x534e5f5345504f4c4941';
const domain = 'localhost:3000';
const uri = 'http://localhost:3000';
const nonce = '24434';
const version = '1';
const signature = [
  5,
  182807847253670189054148137269544596432,
  209158915827206502656055662047977397972,
  265983938849587731701107554471224683662,
  238813364118059209731162891740275108330,
  10,
  1687664388,
  282217588,
  4173548693,
  722530256,
  4284396322,
  314756583,
  4280959236,
  598480136,
  486539264,
  0,
  3,
  41,
  2065855609,
  1885676090,
  578250082,
  1635087464,
  1848534885,
  1948396578,
  1667785068,
  1818586727,
  1696741922,
  1112102766,
  1162954061,
  927413836,
  1984579172,
  1314403381,
  1817392199,
  1296324463,
  1900695637,
  910643527,
  875837268,
  1129740066,
  740454258,
  1768384878,
  574235235,
  1752330093,
  1697473912,
  1952804467,
  1768910394,
  791636590,
  1818714477,
  1701012080,
  1835164010,
  1785096301,
  1835887720,
  1701473125,
  1835362916,
  1835082284,
  576942703,
  1936936818,
  1768384878,
  574252641,
  1819501949,
  0,
  36,
  43,
  4,
  254110009622488636982013770546732541271,
  264836065415609899483308385530037753362,
  34190072398434711028405973196108354372,
  323796247881803489456874707526940140715,
  0
] 
const signature2 = [
  '5',
  '182807847253670189054148137269544596432',
  '209158915827206502656055662047977397972',
  '265983938849587731701107554471224683662',
  '238813364118059209731162891740275108330',
  '10',
  '1687664388',
  '282217588',
  '4173548693',
  '722530256',
  '4284396322',
  '314756583',
  '4280959236',
  '598480136',
  '486539264',
  '0',
  '3',
  '41',
  '2065855609',
  '1885676090',
  '578250082',
  '1635087464',
  '1848534885',
  '1948396578',
  '1667785068',
  '1818586727',
  '1696741922',
  '1112102766',
  '1162954061',
  '927413836',
  '1984579172',
  '1314403381',
  '1817392199',
  '1296324463',
  '1900695637',
  '910643527',
  '875837268',
  '1129740066',
  '740454258',
  '1768384878',
  '574235235',
  '1752330093',
  '1697473912',
  '1952804467',
  '1768910394',
  '791636590',
  '1818714477',
  '1701012080',
  '1835164010',
  '1785096301',
  '1835887720',
  '1701473125',
  '1835362916',
  '1835082284',
  '576942703',
  '1936936818',
  '1768384878',
  '574252641',
  '1819501949',
  '0',
  '36',
  '43',
  '4',
  '254110009622488636982013770546732541271',
  '264836065415609899483308385530037753362',
  '34190072398434711028405973196108354372',
  '323796247881803489456874707526940140715',
  '0'
] 
const signature3 = signature2.map(value => {
  return BigInt(value).toString();
});

console.log('signature-', signature);
console.log('signature2-', signature2);
console.log('signature3-', signature3);

const result = await verifyMessage(client, {
    address: address,
    statement: message,
    uri: uri,
    nonce: nonce,
    version: version,
    chainId: chainId,
    domain: domain,
    signature: signature,
});

console.log('result-', result);


// Argent
// 0x273ff02f97d095a15fd9a896d19fa61290de795134343798f56b25cb371b18a
// [ 1, 0,969608340573873002548328497463227700583087900647642632826265628162355070673,354639915743344206265169349386607697226396223534042610886348629689046680946,551963605960645184979199144543147086475475685903697220736689006455357582120 ]


// Braavos
// 0x485a711010cec6e8bbc915d357e39952e063035a8a893d4e86406e38ed3095c
// [
//     5,
//     182807847253670189054148137269544596432,
//     209158915827206502656055662047977397972,
//     265983938849587731701107554471224683662,
//     238813364118059209731162891740275108330,
//     10,
//     1687664388,
//     282217588,
//     4173548693,
//     722530256,
//     4284396322,
//     314756583,
//     4280959236,
//     598480136,
//     486539264,
//     0,
//     3,
//     41,
//     2065855609,
//     1885676090,
//     578250082,
//     1635087464,
//     1848534885,
//     1948396578,
//     1667785068,
//     1818586727,
//     1696741922,
//     1112102766,
//     1162954061,
//     927413836,
//     1984579172,
//     1314403381,
//     1817392199,
//     1296324463,
//     1900695637,
//     910643527,
//     875837268,
//     1129740066,
//     740454258,
//     1768384878,
//     574235235,
//     1752330093,
//     1697473912,
//     1952804467,
//     1768910394,
//     791636590,
//     1818714477,
//     1701012080,
//     1835164010,
//     1785096301,
//     1835887720,
//     1701473125,
//     1835362916,
//     1835082284,
//     576942703,
//     1936936818,
//     1768384878,
//     574252641,
//     1819501949,
//     0,
//     36,
//     43,
//     4,
//     254110009622488636982013770546732541271,
//     264836065415609899483308385530037753362,
//     34190072398434711028405973196108354372,
//     323796247881803489456874707526940140715,
//     0
// ] 
