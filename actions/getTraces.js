const {Action} = require('actionhero')

module.exports = class TraceInfo extends Action {
  constructor () {
    super()
    this.name = 'getTraces'
    this.description = 'Will return information of all traces'
  }

  async run (data) {
    var requestStatistics = [
      {
        traceId: 'a861117a-d9ce-4193-8d7c-0e4679c58451',
        deviceInfo: {
          model: 'GT-P5100',
          phoneType: 'tablet',
          brand: 'samsung',
          screenSize: '1280 X 752',
          androidversion: '4.0.3'
        },
        location: 'Chennai',
        status: 'FAIL',
        lifeCycle: [
          {
            spanId: '458f0818-c83d-426e-8abe-f786a3c2dbd8',
            timestamp: 123123,
            serviceName: 'MobileSignUp',
            eventLocation: 'signUpController',
            parentSpanId: '',
            metadata: {
              request: {
                username: 'johndeo',
                firstName: 'john',
                lastName: 'deo',
                email: 'john@gmail.com',
                mobile: 9876543211
              },
              response: {
                samplerType: 'const',
                samplerParam: true,
                spanKind: 'server',
                httpMethod: 'GET',
                httpUrl: '/api/services',
                component: 'net/http',
                httpStatusCode: 503
              }
            },
            status: 'FAIL',
            child: [
              {
                spanId: '7c5eedd9-ff6a-4d74-a15d-65aae6e59114',
                timestamp: 123123,
                serviceName: 'ProxyServer',
                eventLocation: 'ProxyServer',
                parentSpanId: '458f0818-c83d-426e-8abe-f786a3c2dbd8',
                status: 'PASS',
                metadata: {
                  request: {
                    username: 'johndeo',
                    firstName: 'john',
                    lastName: 'deo',
                    email: 'john@gmail.com',
                    mobile: 9876543211
                  },
                  response: {
                    samplerType: 'const',
                    samplerParam: true,
                    spanKind: 'server',
                    httpMethod: 'GET',
                    httpUrl: '/api/services',
                    component: 'net/http',
                    httpStatusCode: 200
                  }
                }
              },
              {
                spanId: '8970bb6c-a49a-4bf7-9ae5-710f7bca7d58',
                timestamp: 123123,
                serviceName: 'AuthService',
                eventLocation: 'AuthService',
                parentSpanId: '458f0818-c83d-426e-8abe-f786a3c2dbd8',
                status: 'FAIL',
                metadata: {
                  request: {
                    username: 'johndeo',
                    firstName: 'john',
                    lastName: 'deo',
                    email: 'john@gmail.com',
                    mobile: 9876543211
                  },
                  response: {
                    samplerType: 'const',
                    samplerParam: true,
                    spanKind: 'server',
                    httpMethod: 'GET',
                    httpUrl: '/api/services',
                    component: 'net/http',
                    httpStatusCode: 503
                  }
                },
                child: [
                  {
                    spanId: '68355fa8-f0ce-4c51-858d-85c1954b5523',
                    timestamp: 123123,
                    serviceName: 'signUp',
                    eventLocation: 'signUp',
                    parentSpanId: '8970bb6c-a49a-4bf7-9ae5-710f7bca7d58',
                    status: 'PASS',
                    metadata: {
                      request: {
                        username: 'johndeo',
                        firstName: 'john',
                        lastName: 'deo',
                        email: 'john@gmail.com',
                        mobile: 9876543211
                      },
                      response: {
                        samplerType: 'const',
                        samplerParam: true,
                        spanKind: 'server',
                        httpMethod: 'GET',
                        httpUrl: '/api/services',
                        component: 'net/http',
                        httpStatusCode: 200
                      }
                    }
                  },
                  {
                    spanId: '3baba180-57c3-4e02-b540-4bb4091311a7',
                    timestamp: 123123,
                    serviceName: 'createUser',
                    eventLocation: 'createUser',
                    parentSpanId: '8970bb6c-a49a-4bf7-9ae5-710f7bca7d58',
                    status: 'FAIL',
                    metadata: {
                      request: {
                        username: 'johndeo',
                        firstName: 'john',
                        lastName: 'deo',
                        email: 'john@gmail.com',
                        mobile: 9876543211
                      },
                      response: {
                        samplerType: 'const',
                        samplerParam: true,
                        spanKind: 'server',
                        httpMethod: 'GET',
                        httpUrl: '/api/services',
                        component: 'net/http',
                        httpStatusCode: 503
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        traceId: 'd6bbca9a-dd2f-4b51-8a1d-f62c76ef01f1',
        deviceInfo: {
          model: 'GT-P5100',
          phoneType: 'tablet',
          brand: 'samsung',
          screenSize: '1280 X 752',
          androidversion: '4.0.3'
        },
        location: 'Chennai',
        status: 'FAIL',
        lifeCycle: [
          {
            spanId: '3ccff024-947e-4309-ad30-cac9898b278e',
            timestamp: 123123,
            serviceName: 'MobileSignUp',
            eventLocation: 'signUpController',
            parentSpanId: '',
            status: 'FAIL',
            metadata: {
              request: {
                username: 'johndeo',
                firstName: 'john',
                lastName: 'deo',
                email: 'john@gmail.com',
                mobile: 9876543211
              },
              response: {
                samplerType: 'const',
                samplerParam: true,
                spanKind: 'server',
                httpMethod: 'GET',
                httpUrl: '/api/services',
                component: 'net/http',
                httpStatusCode: 503
              }
            },
            child: [
              {
                spanId: '47de519f-f6fc-4311-8a96-f9ca8207242d',
                timestamp: 123123,
                serviceName: 'ProxyServer',
                eventLocation: 'ProxyServer',
                parentSpanId: '3ccff024-947e-4309-ad30-cac9898b278e',
                status: 'PASS',
                metadata: {
                  request: {
                    username: 'johndeo',
                    firstName: 'john',
                    lastName: 'deo',
                    email: 'john@gmail.com',
                    mobile: 9876543211
                  },
                  response: {
                    samplerType: 'const',
                    samplerParam: true,
                    spanKind: 'server',
                    httpMethod: 'GET',
                    httpUrl: '/api/services',
                    component: 'net/http',
                    httpStatusCode: 200
                  }
                }
              },
              {
                spanId: '87fa043f-8822-4bcd-98ae-27d4918f8612',
                timestamp: 123123,
                serviceName: 'AuthService',
                eventLocation: 'AuthService',
                parentSpanId: '3ccff024-947e-4309-ad30-cac9898b278e',
                status: 'FAIL',
                metadata: {
                  request: {
                    username: 'johndeo',
                    firstName: 'john',
                    lastName: 'deo',
                    email: 'john@gmail.com',
                    mobile: 9876543211
                  },
                  response: {
                    samplerType: 'const',
                    samplerParam: true,
                    spanKind: 'server',
                    httpMethod: 'GET',
                    httpUrl: '/api/services',
                    component: 'net/http',
                    httpStatusCode: 503
                  }
                },
                child: [
                  {
                    spanId: '9cdecebb-fb7c-4a28-9f53-f6bf218fd958',
                    timestamp: 123123,
                    serviceName: 'signUp',
                    eventLocation: 'signUp',
                    parentSpanId: '87fa043f-8822-4bcd-98ae-27d4918f8612',
                    status: 'PASS',
                    metadata: {
                      request: {
                        username: 'johndeo',
                        firstName: 'john',
                        lastName: 'deo',
                        email: 'john@gmail.com',
                        mobile: 9876543211
                      },
                      response: {
                        samplerType: 'const',
                        samplerParam: true,
                        spanKind: 'server',
                        httpMethod: 'GET',
                        httpUrl: '/api/services',
                        component: 'net/http',
                        httpStatusCode: 200
                      }
                    }
                  },
                  {
                    spanId: '78bfcaa3-5bca-42a2-8542-e7674972b1dd',
                    timestamp: 123123,
                    serviceName: 'createUser',
                    eventLocation: 'createUser',
                    parentSpanId: '87fa043f-8822-4bcd-98ae-27d4918f8612',
                    status: 'FAIL',
                    metadata: {
                      request: {
                        username: 'johndeo',
                        firstName: 'john',
                        lastName: 'deo',
                        email: 'john@gmail.com',
                        mobile: 9876543211
                      },
                      response: {
                        samplerType: 'const',
                        samplerParam: true,
                        spanKind: 'server',
                        httpMethod: 'GET',
                        httpUrl: '/api/services',
                        component: 'net/http',
                        httpStatusCode: 503
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        traceId: '0dc36cde-da61-44f9-886a-3fa59efc0a2b',
        deviceInfo: {
          model: 'GT-P5100',
          phoneType: 'tablet',
          brand: 'samsung',
          screenSize: '1280 X 752',
          androidversion: '4.0.3'
        },
        location: 'Chennai',
        status: 'FAIL',
        lifeCycle: [
          {
            spanId: 'c617ac2e-7dae-4df2-8fc8-c0f0f4611481',
            timestamp: 123123,
            serviceName: 'MobileSignUp',
            eventLocation: 'signUpController',
            parentSpanId: '',
            status: 'PASS',
            metadata: {
              request: {
                username: 'johndeo',
                firstName: 'john',
                lastName: 'deo',
                email: 'john@gmail.com',
                mobile: 9876543211
              },
              response: {
                samplerType: 'const',
                samplerParam: true,
                spanKind: 'server',
                httpMethod: 'GET',
                httpUrl: '/api/services',
                component: 'net/http',
                httpStatusCode: 503
              }
            },
            child: [
              {
                spanId: '324d3132-5ac1-49e7-acfb-895bdb0ece4d',
                timestamp: 123123,
                serviceName: 'ProxyServer',
                eventLocation: 'ProxyServer',
                parentSpanId: 'c617ac2e-7dae-4df2-8fc8-c0f0f4611481',
                status: 'FAIL',
                metadata: {
                  request: {
                    username: 'johndeo',
                    firstName: 'john',
                    lastName: 'deo',
                    email: 'john@gmail.com',
                    mobile: 9876543211
                  },
                  response: {
                    samplerType: 'const',
                    samplerParam: true,
                    spanKind: 'server',
                    httpMethod: 'GET',
                    httpUrl: '/api/services',
                    component: 'net/http',
                    httpStatusCode: 200
                  }
                }
              },
              {
                spanId: '326cb0a3-d0a1-4630-896c-3327b75952fd',
                timestamp: 123123,
                serviceName: 'AuthService',
                eventLocation: 'AuthService',
                parentSpanId: 'c617ac2e-7dae-4df2-8fc8-c0f0f4611481',
                status: 'FAIL',
                metadata: {
                  request: {
                    username: 'johndeo',
                    firstName: 'john',
                    lastName: 'deo',
                    email: 'john@gmail.com',
                    mobile: 9876543211
                  },
                  response: {
                    samplerType: 'const',
                    samplerParam: true,
                    spanKind: 'server',
                    httpMethod: 'GET',
                    httpUrl: '/api/services',
                    component: 'net/http',
                    httpStatusCode: 503
                  }
                },
                child: [
                  {
                    spanId: '727474d6-75d3-4e9d-88d6-a8741104656e',
                    timestamp: 123123,
                    serviceName: 'signUp',
                    eventLocation: 'signUp',
                    parentSpanId: '326cb0a3-d0a1-4630-896c-3327b75952fd',
                    status: 'PASS',
                    metadata: {
                      request: {
                        username: 'johndeo',
                        firstName: 'john',
                        lastName: 'deo',
                        email: 'john@gmail.com',
                        mobile: 9876543211
                      },
                      response: {
                        samplerType: 'const',
                        samplerParam: true,
                        spanKind: 'server',
                        httpMethod: 'GET',
                        httpUrl: '/api/services',
                        component: 'net/http',
                        httpStatusCode: 200
                      }
                    }
                  },
                  {
                    spanId: '1db62766-d420-4f1b-a412-bd47cdb40b5e',
                    timestamp: 123123,
                    serviceName: 'createUser',
                    eventLocation: 'createUser',
                    parentSpanId: '326cb0a3-d0a1-4630-896c-3327b75952fd',
                    status: 'FAIL',
                    metadata: {
                      request: {
                        username: 'johndeo',
                        firstName: 'john',
                        lastName: 'deo',
                        email: 'john@gmail.com',
                        mobile: 9876543211
                      },
                      response: {
                        samplerType: 'const',
                        samplerParam: true,
                        spanKind: 'server',
                        httpMethod: 'GET',
                        httpUrl: '/api/services',
                        component: 'net/http',
                        httpStatusCode: 503
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
    data.response.data = requestStatistics
  }
}
