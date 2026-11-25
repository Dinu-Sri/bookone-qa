// Actual CUA form preparation only: no submit, page mutation script or hidden HTTP.
export async function readNamedDate(tab,name){
 if(!['issueDate','dueDate'].includes(name))throw Error('Unapproved named date');
 const l=tab.playwright.locator('form input[name="'+name+'"]');
 if(await l.count()!==1||!await l.isVisible()||!await l.isEnabled())throw Error('Named date unavailable or ambiguous');
 return {locator:l,value:await l.evaluate(e=>e.value)};
}
export async function commitNamedDate(tab,name,value){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||new Date(value+'T00:00:00Z').toISOString().slice(0,10)!==value)throw Error('Invalid date');
 const {locator}=await readNamedDate(tab,name);
 await locator.fill(value);
 const filled=await readNamedDate(tab,name);if(filled.value!==value)throw Error('Date fill did not reach target');
 // Native date segment keyboard events commit controlled state; the pair restores the target.
 await locator.press('ArrowUp');await locator.press('ArrowDown');await locator.press('Tab');
 const committed=await readNamedDate(tab,name);if(committed.value!==value)throw Error('Keyboard date commit changed target');
 return {name,value,method:'fill-keyboard-pair-blur',requiresPostRerenderReadback:true};
}
export async function verifyNamedDates(tab,expected){
 for(const [name,value]of Object.entries(expected))if((await readNamedDate(tab,name)).value!==value)throw Error('Date changed after rerender: '+name);
 return {verified:true,observedAt:new Date().toISOString(),expected};
}
