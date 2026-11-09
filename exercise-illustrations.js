(()=>{
"use strict";
/* Original schematic exercise pictograms, bundled locally for offline access. */
const line = d=>'<path d="'+d+'"/>';
const dot=(x,y,r=6)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'"/>';
const bar=(x1,y1,x2,y2)=>'<g stroke="#ba7844">'+line('M'+x1+' '+y1+'L'+x2+' '+y2)+'</g>';
const db=(x,y)=>'<g stroke="#ba7844" stroke-width="5">'+line('M'+(x-8)+' '+y+'h16M'+(x-8)+' '+(y-6)+'v12M'+(x+8)+' '+(y-6)+'v12')+'</g>';
const cable='<g stroke="#a47d48" stroke-width="2.5">'+line('M83 12V78M78 12h10M83 14L66 31')+'</g>';
const floor='<path stroke="#b9cfc4" d="M7 86H89"/>';
const bench='<g stroke="#a2bfb2" stroke-width="4">'+line('M16 72H84M24 72V85M77 72V85')+'</g>';
const angledBench='<g stroke="#a2bfb2" stroke-width="4">'+line('M32 35L61 74H80M61 74V85M36 40L29 67M28 67V85')+'</g>';
const stand=dot(48,17)+line('M48 24V52M48 52L36 81M48 52L60 81');
const seated=dot(42,22)+line('M43 29V55L62 59L77 77M43 55L35 77')+line('M30 58H70M30 58V82');
const lie=dot(23,57)+line('M30 57H66L77 71M66 57L60 72')+bench;
const lean=dot(65,28)+line('M58 35L31 52L33 67M31 52L15 77M31 52L53 81');
const crouch=dot(48,17)+line('M48 24L57 50L34 59L24 80M34 59L58 81');
const kneel=dot(54,27)+line('M49 33L41 56L58 65L67 80M41 56L28 73L14 73');
const pressEquip=bar(12,28,84,28)+'<g stroke="#ba7844" stroke-width="5">'+line('M20 21V35M76 21V35')+'</g>';
const lift=(arms)=>stand+arms;
const shape={
 pressFlat:lie+line('M40 56L41 33L51 33L55 56')+pressEquip,
 pressIncline:angledBench+dot(35,33)+line('M39 40L56 65L67 73L79 81M54 56L66 34L78 30')+bar(56,23,92,23),
 flyFlat:lie+line('M45 57L23 30M52 57L77 30')+db(23,30)+db(77,30),
 flyIncline:angledBench+dot(37,36)+line('M42 44L59 68L75 76M50 54L25 24M52 53L78 24')+db(25,24)+db(78,24),
 crossover:line('M12 13V74M84 13V74M12 13L34 43M84 13L62 43')+stand+line('M48 34L37 49L49 52M48 34L60 49L49 52'),
 pressDown:cable+lift(line('M48 32L59 43L63 62M48 32L38 45L38 64'))+bar(33,64,70,64),
 tricepsOver:cable+stand+line('M48 34L31 19L37 9M48 34L66 19L61 9')+db(50,9),
 tricepsLying:lie+line('M40 57L44 35L35 22M54 57L62 34L52 22')+bar(28,20,60,20),
 calfStanding:stand+line('M48 34L33 45M48 34L65 45')+line('M18 84H76')+'<g stroke="#ba7844">'+line('M36 79l-4 -8M60 79l4 -8')+'</g>',
 calfSeated:seated+line('M42 35L21 50M42 35L63 52')+bar(48,65,79,65),
 rowBent:lean+line('M39 44L55 53L67 48')+db(67,48),
 rowSeated:seated+line('M44 39L65 45L79 38')+cable+line('M68 50L80 38'),
 pullDown:seated+line('M43 37L20 27L19 14M43 37L64 27L67 14')+bar(15,12,71,12),
 pullBehind:seated+line('M43 35L25 28L27 17M43 35L60 28L60 17')+bar(23,15,64,15),
 pullStraight:cable+stand+line('M48 34L63 36L67 50M48 34L35 40L29 50')+bar(26,51,70,51),
 curlBar:stand+line('M48 32L34 45L40 56M48 32L62 45L56 56')+bar(32,55,64,55),
 curlIncline:angledBench+dot(36,34)+line('M40 40L56 62L68 78M46 48L30 58L30 46')+db(30,46),
 curlPreacher:seated+line('M52 41L67 40L57 22')+line('M56 45L76 62M60 55L71 38')+db(57,22),
 curlCable:cable+stand+line('M48 33L64 39L70 25M48 33L34 39L29 26')+db(69,26),
 crunch:dot(23,59)+line('M30 57L47 43L61 58L77 71M61 58L58 72')+line('M22 81H84'),
 crunchCable:cable+kneel+line('M52 37L62 38L68 28'),
 crunchOblique:dot(23,61)+line('M30 60L50 45L64 62L77 73M64 62L55 76')+line('M22 82H85')+line('M40 48L50 36'),
 hipThrust:dot(34,54)+line('M39 57L57 36L71 61L84 70M57 36L66 56')+line('M15 63H40M20 63V82M8 84H88'),
 plank:dot(21,56)+line('M28 55L61 46L81 67M48 50L39 71M81 67V82')+line('M8 85H90'),
 sidePlank:dot(24,43)+line('M30 47L60 50L83 73M40 49L31 79M60 50L59 34')+line('M10 85H90'),
 hangLeg:dot(46,22)+line('M46 29V51L58 63L70 63M46 51L38 63L23 63M46 34L31 15M46 34L63 15')+bar(19,11,75,11),
 shoulderPress:stand+line('M48 35L30 29L29 14M48 35L66 29L67 14')+db(29,13)+db(67,13),
 lateralRaise:stand+line('M48 34L19 33M48 34L76 33')+db(17,33)+db(79,33),
 frontRaise:stand+line('M48 35L64 28L74 24M48 35L37 50')+db(76,24),
 rearRaise:lean+line('M45 44L13 35M45 44L77 35')+db(12,35)+db(78,35),
 uprightRow:stand+line('M48 34L27 42L40 49M48 34L69 42L56 49')+bar(32,51,64,51),
 shrug:stand+line('M48 34L33 49L32 62M48 34L63 49L64 62')+db(32,65)+db(64,65)+'<g stroke="#ba7844">'+line('M30 33l4 -8l4 8M60 33l4 -8l4 8')+'</g>',
 squat:crouch+line('M48 29L30 37M48 29L68 37')+bar(20,29,76,29),
 deadlift:lean+line('M40 43L38 65L40 73M45 41L50 64L55 73')+bar(22,75,73,75),
 legPress:dot(29,50)+line('M33 56L52 68L66 52L75 30M52 68L57 76M26 57L15 77')+line('M77 17L91 48M12 85H70'),
 legExtension:seated+line('M62 59L77 47')+db(78,47),
 legCurl:dot(22,52)+line('M29 52L59 56L69 42M59 56L80 70')+bench,
 woodchopper:cable+stand+line('M48 34L59 29L68 17M48 34L61 44L71 52')+line('M68 17L83 13'),
 sideBend:dot(44,17)+line('M44 25L56 48L53 63L44 82M53 63L69 82M48 35L31 52L27 69')+db(27,69),
 general:stand+line('M48 35L34 51M48 35L62 51')
};
const groups={
 pressFlat:['Bench Press','Close-Grip Bench Press'],
 pressIncline:['Incline Bench Press','Incline Dumbbell Press','Reverse-Grip Incline Dumbbell Press'],
 flyFlat:['Dumbbell Flye'],
 flyIncline:['Incline Dumbbell Flye','Incline Cable Flye'],
 crossover:['Cable Crossover'],
 pressDown:['Triceps Pressdown'],
 tricepsLying:['Lying Triceps Extension','Cable Lying Triceps Extension'],
 tricepsOver:['Cable Overhead Triceps Extension','Dumbbell Overhead Triceps Extension','One-Arm Overhead Cable Triceps Extension'],
 calfStanding:['Standing Calf Raise','Leg Press Calf Raise'],
 calfSeated:['Seated Calf Raise'],
 rowBent:['Dumbbell Bent-Over Row'],
 rowSeated:['Seated Cable Row'],
 pullDown:['Wide-Grip Pulldown','Reverse-Grip Pulldown'],
 pullBehind:['Behind-Neck Pulldown'],
 pullStraight:['Straight Arm Pulldown','Straight-Arm Pulldown','Standing Pulldown'],
 curlBar:['Barbell Curl','Behind-Back Cable Curl'],
 curlIncline:['Dumbbell Incline Curl','Incline Cable Curl'],
 curlPreacher:['Preacher Curl','Dumbbell Concentration Curl'],
 curlCable:['One-Arm High Cable Curl'],
 crunch:['Crunch','Weighted Crunch','Machine Crunch'],
 crunchCable:['Cable Crunch'],
 crunchOblique:['Oblique Crunch','Cable Oblique Crunch'],
 hipThrust:['Hip Thrust','Weighted Hip Thrust','Smith Machine Hip Thrust'],
 plank:['Plank'],
 sidePlank:['Side Plank'],
 hangLeg:['Hanging Leg Raise'],
 shoulderPress:['Dumbbell Shoulder Press'],
 lateralRaise:['Dumbbell Lateral Raise','One-Arm Cable Lateral Raise'],
 frontRaise:['One-Arm Cable Front Raise'],
 rearRaise:['High Cable Rear Delt Fly','Bent-Over Lateral Raise'],
 uprightRow:['Dumbbell Upright Row','Smith Machine Upright Row'],
 shrug:['Dumbbell Shrug','Barbell Shrug','One-Arm Smith Machine Shrug'],
 squat:['Squat','Front Squat'],
 deadlift:['Romanian Deadlift'],
 legPress:['One-Leg Leg Press','Leg Press'],
 legExtension:['Leg Extension'],
 legCurl:['Lying Leg Curl','Seated Leg Curl'],
 woodchopper:['Cable Woodchopper','Band Roundhouse Elbow'],
 sideBend:['Dumbbell Side Bend']
};
const lookup=Object.fromEntries(Object.entries(groups).flatMap(([k,a])=>a.map(n=>[n,k])));
function render(name){
 const type=lookup[name]||'general';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" aria-hidden="true"><rect x="1" y="1" width="94" height="94" rx="17" fill="#f1f7ef"/><g stroke="#295d4a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">'+floor+(shape[type]||shape.general)+'</g></svg>';
}
window.WorkoutIllustrations={render,known:name=>!!lookup[name],types:Object.freeze(lookup)};
})();