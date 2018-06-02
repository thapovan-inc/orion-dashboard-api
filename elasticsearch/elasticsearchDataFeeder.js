var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'ec2-52-22-142-216.compute-1.amazonaws.com:9200',
  log: 'trace'
})
const uuidv4 = require('uuid/v4')
var durations = [1, 2, 3, 4, 5]
var status = ['PASS', 'SLOW', 'FAIL']
var serviceName = ['Signin', 'Signup', 'products', 'orderPlacement']
var country = ['india', 'usa', 'srilanka', 'pakistan', 'malasia', 'butan', 'uae']
var ip = ['127.0.0.1', '192.168.1.198', '192.168.1.1', '192.168.1.2', '192.168.1.3', '192.168.1.4']

var trace_id1 = uuidv4()
var trace_id2 = uuidv4()
var trace_id3 = uuidv4()
var trace_id4 = uuidv4()
var trace_id5 = uuidv4()
var trace_id6 = uuidv4()
var trace_id7 = uuidv4()

var requestStatistics = {
  traceId: trace_id1,
  requestTime: Date.now(),
  duration: durations[getValue(durations)],
  status: status[getValue(status)],
  email: 'test'+getValue(durations)+'.gmail.com',
  userId: trace_id2,
  serviceName: serviceName[getValue(serviceName)],
  country: country[getValue(country)],
  ip: ip[getValue(ip)]
}

// var requestStatistics = {
//   traceId: trace_id1,
//   deviceInfo: {
//     model: 'GT-P5100',
//     phoneType: 'tablet',
//     brand: 'samsung',
//     screenSize: '1280 X 752',
//     androidversion: '4.0.3'
//   },
//   location: 'Chennai',
//   status: 'FAIL',
//   lifeCycle: [
//     {
//       spanId: trace_id2,
//       timestamp: 123123,
//       serviceName: 'MobileSignUp',
//       eventLocation: 'signUpController',
//       parentSpanId: '',
//       metadata: {
//         request: {
//           username: 'johndeo',
//           firstName: 'john',
//           lastName: 'deo',
//           email: 'john@gmail.com',
//           mobile: 9876543211
//         },
//         response: {
//           samplerType: 'const',
//           samplerParam: true,
//           spanKind: 'server',
//           httpMethod: 'GET',
//           httpUrl: '/api/services',
//           component: 'net/http',
//           httpStatusCode: 503
//         }
//       },
//       status: 'FAIL',
//       child: [
//         {
//           spanId: trace_id3,
//           timestamp: 123123,
//           serviceName: 'ProxyServer',
//           eventLocation: 'ProxyServer',
//           parentSpanId: trace_id2,
//           status: 'PASS',
//           metadata: {
//             request: {
//               username: 'johndeo',
//               firstName: 'john',
//               lastName: 'deo',
//               email: 'john@gmail.com',
//               mobile: 9876543211
//             },
//             response: {
//               samplerType: 'const',
//               samplerParam: true,
//               spanKind: 'server',
//               httpMethod: 'GET',
//               httpUrl: '/api/services',
//               component: 'net/http',
//               httpStatusCode: 200
//             }
//           }
//         },
//         {
//           spanId: trace_id4,
//           timestamp: 123123,
//           serviceName: 'AuthService',
//           eventLocation: 'AuthService',
//           parentSpanId: trace_id2,
//           status: 'FAIL',
//           metadata: {
//             request: {
//               username: 'johndeo',
//               firstName: 'john',
//               lastName: 'deo',
//               email: 'john@gmail.com',
//               mobile: 9876543211
//             },
//             response: {
//               samplerType: 'const',
//               samplerParam: true,
//               spanKind: 'server',
//               httpMethod: 'GET',
//               httpUrl: '/api/services',
//               component: 'net/http',
//               httpStatusCode: 503
//             }
//           },
//           child: [
//             {
//               spanId: trace_id5,
//               timestamp: 123123,
//               serviceName: 'signUp',
//               eventLocation: 'signUp',
//               parentSpanId: trace_id4,
//               status: 'PASS',
//               metadata: {
//                 request: {
//                   username: 'johndeo',
//                   firstName: 'john',
//                   lastName: 'deo',
//                   email: 'john@gmail.com',
//                   mobile: 9876543211
//                 },
//                 response: {
//                   samplerType: 'const',
//                   samplerParam: true,
//                   spanKind: 'server',
//                   httpMethod: 'GET',
//                   httpUrl: '/api/services',
//                   component: 'net/http',
//                   httpStatusCode: 200
//                 }
//               }
//             },
//             {
//               spanId: trace_id6,
//               timestamp: 123123,
//               serviceName: 'createUser',
//               eventLocation: 'createUser',
//               parentSpanId: trace_id4,
//               status: 'FAIL',
//               metadata: {
//                 request: {
//                   username: 'johndeo',
//                   firstName: 'john',
//                   lastName: 'deo',
//                   email: 'john@gmail.com',
//                   mobile: 9876543211
//                 },
//                 response: {
//                   samplerType: 'const',
//                   samplerParam: true,
//                   spanKind: 'server',
//                   httpMethod: 'GET',
//                   httpUrl: '/api/services',
//                   component: 'net/http',
//                   httpStatusCode: 503
//                 }
//               }
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

client.index({
  index: 'traces',
  id: trace_id1,
  type: 'trace_id',
  body: requestStatistics
}, function (err, resp, status) {
  console.log(err)
  console.log(resp)
  console.log(status)
})
