import http from 'k6/http';
import {check} from 'k6';
import {sleep} from  'k6';

export const options = {

    scenarios: {

        simple_breakpoint: {
            executor: 'ramping-arrival-rate',
            stages: [
                { target: 10, duration: '30s' },
                { target: 50, duration: '30s' },
                { target: 0, duration: '30s' },
            ],
            preAllocatedVUs: 500
        },

        simple_constant_load_test:{
            executor: 'constant-arrival-rate',
            rate: 30,
            timeUnit: '1s',
            duration: '1m',
            gracefulStop: '10s',
            preAllocatedVUs: 50
        }

    },

    thresholds: { // 임계값
        http_req_failed: [
            {
                threshold: 'rate<0.01',
                abortOnFail: true,
                delayAbortEval: '10s'
            }
        ],
        http_req_duration: [
            {
                threshold: 'p(95)<300',
                abortOnFail: true,
                delayAbortEval: "10s"
            }
        ]
    },
};

export default function () {
    const res = http.get(`${__ENV.HOST_NAME}`);

    check(res,{
        'is status 200': (r) => r.status === 200,
    });

    sleep(1)

};