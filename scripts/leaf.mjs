// Generates the laurel path data for LeafRule.
// Stem: cubic from centre (120,14) out to the tip (232,9.5).
const P = [[120,14],[154,14.6],[196,13],[232,9.5]];
const at = t => {
  const u = 1-t, b=[u*u*u, 3*u*u*t, 3*u*t*t, t*t*t];
  return [P.reduce((s,p,i)=>s+p[0]*b[i],0), P.reduce((s,p,i)=>s+p[1]*b[i],0)];
};
const tan = t => {
  const u=1-t, b=[-3*u*u, 3*u*u-6*u*t, 6*u*t-3*t*t, 3*t*t];
  const x=P.reduce((s,p,i)=>s+p[0]*b[i],0), y=P.reduce((s,p,i)=>s+p[1]*b[i],0);
  const m=Math.hypot(x,y); return [x/m,y/m];
};
const r2 = n => Math.round(n*10)/10;
const leaves = [];
const N = 7;
for (let i=0;i<N;i++){
  const t = 0.1 + (0.86-0.1)*i/(N-1);
  const [bx,by] = at(t);
  const [tx,ty] = tan(t);
  const side = i%2 ? -1 : 1;              // alternate above / below the stem
  const ang = Math.atan2(ty,tx) + side*0.82;  // ~47deg, swept toward the tip
  const len = 13.5 - 8.2*(t-0.1)/0.76;    // leaves shrink toward the tip
  const w = len*0.40;
  const dx = Math.cos(ang), dy = Math.sin(ang);
  const ex = bx+dx*len, ey = by+dy*len;
  const mx = bx+dx*len*0.5, my = by+dy*len*0.5;
  const nx = -dy*w, ny = dx*w;
  leaves.push(`M${r2(bx)} ${r2(by)}Q${r2(mx+nx)} ${r2(my+ny)} ${r2(ex)} ${r2(ey)}Q${r2(mx-nx)} ${r2(my-ny)} ${r2(bx)} ${r2(by)}Z`);
}
console.log('STEM:', `M120 14C${P.slice(1).map(p=>r2(p[0])+' '+r2(p[1])).join('')}`.replace(/(\d)([A-Z-])/g,'$1 $2'));
console.log('STEM2:', `M120 14C154 14.6 196 13 232 9.5`);
console.log('LEAVES:', leaves.join(''));
