console.log("Hello via Bun!");

import { createPublicClient } from '../../packages/starkweb/dist/esm/clients/createPublicClient'
import { http } from '../../packages/starkweb/dist/esm/clients/transports/http'
import { sepolia } from '../../packages/starkweb/dist/esm/chains/definitions/sepolia'
import { accountABI } from '../../packages/starkweb/dist/esm/utils/siws/account-contract-abi';

export const client = createPublicClient({
  transport: http('https://starknet-sepolia.infura.io/v3/db72641028ee47f5b18bcbb791a3f829'),
  chain: sepolia,
})

// const result = await client.readContract({
//   address: '0x034abecf49cedc634d0c3145da7b1caea99d8d4f2da5b5d41e532ea05192d523',
//   abi: accountABI,
//   functionName: 'is_valid_signature',
//   args: {
//     hash: '0x27b4c79805bf6b17673e0f7a85bb8c7e6e35d51f68495b766b6bf576238b12c',
//     signature: [5, 182807847253670189054148137269544596432, 209158915827206502656055662047977397972, 265983938849587731701107554471224683662, 238813364118059209731162891740275108330, 10, 1687664388, 282217588, 4173548693, 722530256, 4284396322, 314756583, 4280959236, 598480136, 486539264, 0, 3, 69, 2065855609, 1885676090, 578250082, 1635087464, 1848534885, 1948396578, 1667785068, 1818586727, 1696741922, 1097757773, 1700348514, 963790386, 1663910963, 1900442932, 2016240234, 1482049586, 1749702451, 1517445471, 1446136116, 1934849826, 740454258, 1768384878, 574235235, 1752330093, 1697473912, 1952804467, 1768910394, 791636590, 1818714477, 1701012080, 1835164010, 1785096301, 1835887720, 1701473125, 1835362916, 1835082284, 576942703, 1936936818, 1768384878, 574252641, 1819501868, 577729640, 1701994347, 1702458207, 1667329631, 1650810721, 1684301156, 1600677234, 1696741922, 1685004398, 1869881443, 1869443169, 1919230051, 1818846574, 1950638452, 1632260943, 1310744935, 1634299507, 1948279072, 1952804208, 1818326117, 773870437, 1696622708, 1953526586, 791635823, 1865312108, 796483938, 1348827170, 2097152000, 3, 36, 43, 4, 27971305102843460921603138217462833460, 57297906374675316205781579912275865588, 278375059008819071223887669809607208599, 112632489585381867925996163308744533538, 0],
// },
// })


// console.log(result)