import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

//console.log(devices)
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 100 * 10000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 120000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    /*{
      name: 'Mobile Safari',
      use: {
        ...devices['Blackberry PlayBook'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['Blackberry PlayBook landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['BlackBerry Z30 landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['Galaxy Note 3'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['Galaxy Note 3 landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['Galaxy Note II'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['Galaxy Note II landscape'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },*/
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy S8'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy S8 landscape'],
      },
    },
    /*{
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy S9+'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy S9+ landscape'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy Tab S4'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy Tab S4 landscape'],
      },
    },
   /*  {
      name: 'Mobile Chrome',
      use: {
        ...devices['LG Optimus L70'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['LG Optimus L70 landscape'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Microsoft Lumia 550'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Microsoft Lumia 550 landscape'],
      },
    }, */
    /* 
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Microsoft Lumia 950'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Microsoft Lumia 950 landscape'],
      },
    }, */
    /*{
      name: 'Mobile Chrome',
      use: {
        ...devices['Nexus 10'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Nexus 10 landscape'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Nexus 4'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Nexus 4 landscape'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 3'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 3 landscape'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 4a (5G)'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 4a (5G) landscape'],
      },
    },
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPhone 12'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPhone 12 landscape'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPhone 11'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPhone 11 landscape'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPhone 13'],
       },
     }
     ,
     {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13 landscape'],
      },
    }
    ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPad Mini'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPad Mini landscape'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPad Pro 11'],
       },
     }
     ,
    {
       name: 'Mobile Safari',
       use: {
         ...devices['iPad Pro 11 landscape'],
       },
     },
     {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
        },
      },
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
        },
      },
      {
        name: 'firefox',
        use: {
          ...devices['Desktop Firefox'],
        },
      }/*,
      {
        name: 'firefox',
        use: {
          ...devices['JioPhone 2'],
        },
      }*/

    


    
   
  /* {
    name: 'chromium:latest-10',
    use: {
      ...devices['Desktop Chrome'],
    },
  },
  {
    name: 'chromium:latest-7',
    use: {
      ...devices['Desktop Chrome'],
    },
  }, */
   //  {
   //    name: 'firefox',
   //    use: {
   //      ...devices['Desktop Firefox'],
   //    },
   //  },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;




/* 
{
         name: 'Mobile Safari',
         use: {
           ...devices['iPhone 13'],
         },
    }, 
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13 landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 11'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 11 landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    }, {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12 landscape'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPad Mini'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPad Mini landscape'],
      },
    },
    ,
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPad Pro 11'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPad Pro 11 landscape'],
      },
    }
     */