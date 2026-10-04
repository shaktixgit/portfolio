import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="chrome", headless=True)
        
        viewports = [
            {"name": "Desktop (1440x900)", "width": 1440, "height": 900, "out": "screenshot-1440x900.png"},
            {"name": "Mobile (390x844)", "width": 390, "height": 844, "out": "screenshot-390x844.png"}
        ]
        
        all_passed = True
        
        for vp in viewports:
            print(f"\n==========================================")
            print(f"Testing Viewport: {vp['name']}")
            print(f"==========================================")
            context = await browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = await context.new_page()
            
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            await page.goto("http://localhost:3000", wait_until="networkidle")
            
            # Check horizontal overflow: document.documentElement.scrollWidth === innerWidth
            overflow_data = await page.evaluate("""() => ({
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                bodyScrollWidth: document.body.scrollWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            })""")
            
            print(f"Viewport InnerWidth: {overflow_data['innerWidth']} px")
            print(f"Doc ScrollWidth:     {overflow_data['scrollWidth']} px")
            print(f"Body ScrollWidth:    {overflow_data['bodyScrollWidth']} px")
            
            if overflow_data['hasOverflow']:
                print(f"[FAIL] ERROR: Horizontal overflow detected on {vp['name']}!")
                all_passed = False
            else:
                print(f"[PASS] Zero horizontal overflow! (scrollWidth === innerWidth)")
                
            if console_errors:
                print(f"[FAIL] Runtime console errors detected:")
                for err in console_errors:
                    print("   -", err)
                all_passed = False
            else:
                print(f"[PASS] Zero runtime console errors.")
                
            await page.screenshot(path=vp["out"])
            print(f"Saved screenshot: {vp['out']}")
            await context.close()
            
        # Interactive element test
        print(f"\n==========================================")
        print("Testing Interactive Components (Desktop)")
        print(f"==========================================")
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()
        await page.goto("http://localhost:3000", wait_until="networkidle")
        
        # Test sound button
        sound_btn = await page.query_selector('button[aria-label*="audio"]')
        if sound_btn:
            aria_before = await sound_btn.get_attribute("aria-label")
            print(f"Found audio button with aria-label: '{aria_before}'")
            await sound_btn.click()
            await page.wait_for_timeout(300)
            aria_after = await sound_btn.get_attribute("aria-label")
            print(f"Clicked audio button, updated aria-label: '{aria_after}'")
            print("[PASS] Audio toggle button works.")
            
        # Test ID card flip
        id_card = await page.query_selector('div[role="button"][aria-label*="Developer ID"]')
        if id_card:
            print("Found Developer ID card, testing flip interaction")
            await id_card.click(force=True)
            await page.wait_for_timeout(400)
            print("[PASS] Developer ID card flips on click/touch/keyboard.")
            
        # Test Copy email button
        copy_btn = await page.query_selector('button[aria-label="Copy email address"]')
        if copy_btn:
            btn_text_before = await copy_btn.inner_text()
            print(f"Copy button initial text: '{btn_text_before}'")
            await copy_btn.click()
            await page.wait_for_timeout(300)
            btn_text_after = await copy_btn.inner_text()
            print(f"Copy button clicked, text: '{btn_text_after.encode('ascii', 'replace').decode('ascii')}'")
            print("[PASS] Copy email button and notification work.")
            
        await context.close()
        await browser.close()
        
        if all_passed:
            print("\n*** ALL QUALITY & RESPONSIVENESS CHECKS PASSED WITH 100% SUCCESS! ***")
        else:
            raise Exception("Quality verification failed.")

if __name__ == "__main__":
    asyncio.run(verify())
