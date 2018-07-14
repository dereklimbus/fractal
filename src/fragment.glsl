precision highp float;

uniform vec2 viewportSize;
uniform float minRe;
uniform float maxRe;
uniform float minIm;
uniform float maxIm;

void main() {
	vec2 c = vec2(
		gl_FragCoord.x / viewportSize.x * (maxRe - minRe) + minRe,
		gl_FragCoord.y / viewportSize.y * (maxIm - minIm) + minIm
	);

	vec2 z = c;
	int iteration = 0;
	const int maxIteration = 1000;

	while (z.x * z.x + z.y * z.y < 4.0 && iteration < maxIteration) {
		float t = 2.0 * z.x * z.y + c.y;
		z.x = z.x * z.x - z.y * z.y + c.x;
		z.y = t;

		iteration++;
	}

	if (iteration < maxIteration) {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	} else {
		discard;
	}
}
