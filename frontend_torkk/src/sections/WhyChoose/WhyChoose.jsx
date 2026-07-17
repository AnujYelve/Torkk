import Container from "@/components/ui/Container";
import FeatureItem from "./FeatureItem";
import features from "./features";

export default function WhyChoose() {
  return (
    <section className="bg-white py-24">
      <Container>

        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">

          

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            Why Torkk is Different
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-500">
            Built around trust, technology and rider safety to create a
            smarter mobility experience.
          </p>

        </div>

        {/* Features */}

        <div className="mt-20 grid gap-x-16 gap-y-12 lg:grid-cols-2">

          {features.map((feature) => (
            <FeatureItem
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}