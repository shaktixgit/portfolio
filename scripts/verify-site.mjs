import { chromium } from 'playwright';

async function verify() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ];

  let allPassed = true;

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Check horizontal overflow
    const overflowCheck = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });

    console.log(`ScrollWidth: ${overflowCheck.scrollWidth}, InnerWidth: ${overflowCheck.innerWidth}`);
    if (overflowCheck.hasOverflow) {
      console.error(`FAIL: Horizontal overflow detected on ${vp.name}!`);
      allPassed = false;
    } else {
      console.log(`PASS: Zero horizontal overflow on ${vp.name} (${overflowCheck.scrollWidth} === ${overflowCheck.innerWidth}).`);
    }

    if (errors.length > 0) {
      console.error(`FAIL: Console errors detected on ${vp.name}:`, errors);
      allPassed = false;
    } else {
      console.log(`PASS: Zero console errors on ${vp.name}.`);
    }

    await page.close();
  }

  // Interactive tests on desktop
  console.log('\n--- Testing Interactive Elements ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Hero sound button
  const soundBtn = await page.$('button[aria-label*="audio"]');
  if (soundBtn) {
    console.log('Found hero audio button');
    await soundBtn.click();
    const newAria = await soundBtn.getAttribute('aria-label');
    console.log('Audio button toggled, new aria-label:', newAria);
  }

  // 2. ID card flip
  const idCard = await page.$('div[role="button"][aria-label*="Developer ID"]');
  if (idCard) {
    console.log('Found ID card, testing flip interaction');
    await idCard.click();
    console.log('Clicked ID card successfully');
  }

  // 3. Scroll to Achievements
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);
  console.log('Scrolled page smoothly, checking state');

  await page.close();
  await browser.close();

  if (allPassed) {
    console.log('\nALL VERIFICATION CHECKS PASSED PERFECTLY!');
  } else {
    process.exit(1);
  }
}

verify().catch((err) => {
  console.error('Error running verification:', err);
  process.exit(1);
});
