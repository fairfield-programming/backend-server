function gradientBackground(trueDuckData) {
    return ( trueDuckData.color === "url(#rainbow)" ||
        trueDuckData.beakColor === "url(#rainbow)");
}

module.exports = { gradientBackground };