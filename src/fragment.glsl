precision highp float;

struct Size {
	int width;
	int height;
};
struct Range {
	float min;
	float max;
};
struct Range2d {
	Range x;
	Range y;
};

uniform Size size;
uniform Range2d range;

vec3 hsl2rgb(vec3 hsl);
float hue2rgb(float f1, float f2, float hue);

void main() {
	vec2 c = vec2(
		gl_FragCoord.x / float(size.width) * (range.x.max - range.x.min) + range.x.min,
		gl_FragCoord.y / float(size.height) * (range.y.max - range.y.min) + range.y.min
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
		gl_FragColor = vec4(hsl2rgb(hsl), 1.0);
	} else {
		discard;
	}
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;
    if (hsl.y == 0.0) {
      rgb = vec3(hsl.z);
    } else {
      float f2;

      if (hsl.z < 0.5) {
				f2 = hsl.z * (1.0 + hsl.y);
			}
      else {
				f2 = hsl.z + hsl.y - hsl.y * hsl.z;
			}

      float f1 = 2.0 * hsl.z - f2;

      rgb.r = hue2rgb(f1, f2, hsl.x + (1.0 / 3.0));
      rgb.g = hue2rgb(f1, f2, hsl.x);
      rgb.b = hue2rgb(f1, f2, hsl.x - (1.0 / 3.0));
    }
    return rgb;
}

float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0) {
			hue += 1.0;
		}
    else if (hue > 1.0) {
			hue -= 1.0;
		}

    float res;
    if ((6.0 * hue) < 1.0) {
			res = f1 + (f2 - f1) * 6.0 * hue;
		}
    else if ((2.0 * hue) < 1.0) {
			res = f2;
		}
    else if ((3.0 * hue) < 2.0) {
			res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
		}
    else {
			res = f1;
		}
    return res;
}
