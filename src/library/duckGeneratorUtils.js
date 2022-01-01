const gradientData = `<defs>
            <linearGradient id='rainbow' gradientTransform='translate(0.2, 0), rotate(20)'>
                <stop offset='0'     stop-color='#FF0018'/>
                <stop offset='0.166' stop-color='#FF0018'/>
                <stop offset='0.166' stop-color='#FFA52C'/>
                <stop offset='0.333' stop-color='#FFA52C'/>
                <stop offset='0.333'   stop-color='#FFFF41'/>
                <stop offset='0.5' stop-color='#FFFF41'/>
                <stop offset='0.5' stop-color='#008018'/>
                <stop offset='0.666' stop-color='#008018'/>
                <stop offset='0.666' stop-color='#0000F9'/>
                <stop offset='0.833' stop-color='#0000F9'/>
                <stop offset='0.833' stop-color='#86007D'/>
            </linearGradient>
        </defs>`;
function gradientBackground(trueDuckData) {
  return (trueDuckData.color === 'url(#rainbow)'
    || trueDuckData.beakColor === 'url(#rainbow)');
}

module.exports = {
  gradientData,
  gradientBackground,
};
