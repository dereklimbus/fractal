precision highp float;

uniform vec2 size;
uniform vec2 center;
uniform float unit;

vec3 rgb(vec3 hsl);
float channel(float factor1, float factor2, float value);

void main() {
	vec2 origin = vec2(
		center.x - size.x / 2.0 * unit,
		center.y - size.y / 2.0 * unit
	);
	vec2 c = vec2(
		origin.x + gl_FragCoord.x * unit,
		origin.y + gl_FragCoord.y * unit
	);
	vec2 z = c;
	int iteration = 0;
	const int maxIteration = 1000;

	for (int i = 0; i < maxIteration; i++) {
		float t = 2.0 * z.x * z.y + c.y;
		z.x = z.x * z.x - z.y * z.y + c.x;
		z.y = t;

		if (z.x * z.x + z.y * z.y > 4.0) {
			break;
		}

		iteration++;
	}

	if (iteration < maxIteration) {
		float h = (1.0 - float(iteration) / float(maxIteration)) * 240.0 / 360.0;
		vec3 hsl = vec3(h, 1.0, 0.5);
		gl_FragColor = vec4(rgb(hsl), 1.0);
	} else {
		discard;
	}
}

vec3 rgb(vec3 hsl) {
    vec3 rgb;
    if (hsl.y == 0.0) {
      rgb = vec3(hsl.z);
    } else {
      float factor2;

      if (hsl.z < 0.5) {
				factor2 = hsl.z * (1.0 + hsl.y);
			}
      else {
				factor2 = hsl.z + hsl.y - hsl.y * hsl.z;
			}

      float factor1 = 2.0 * hsl.z - factor2;

      rgb.r = channel(factor1, factor2, hsl.x + (1.0 / 3.0));
      rgb.g = channel(factor1, factor2, hsl.x);
      rgb.b = channel(factor1, factor2, hsl.x - (1.0 / 3.0));
    }
    return rgb;
}

float channel(float factor1, float factor2, float value) {
    if (value < 0.0) {
			value += 1.0;
		}
    else if (value > 1.0) {
			value -= 1.0;
		}

    float channel;
    if ((6.0 * value) < 1.0) {
			channel = factor1 + (factor2 - factor1) * 6.0 * value;
		}
    else if ((2.0 * value) < 1.0) {
			channel = factor2;
		}
    else if ((3.0 * value) < 2.0) {
			channel = factor1 + (factor2 - factor1) * ((2.0 / 3.0) - value) * 6.0;
		}
    else {
			channel = factor1;
		}
    return channel;
}
