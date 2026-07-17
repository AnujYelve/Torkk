import {
  ShieldCheck,
  MapPinned,
  Smartphone,
} from "lucide-react";

export default function TrustFeatures() {
  return (
    <div className="mt-16 flex gap-12">

      <div className="flex items-start gap-3">

        <ShieldCheck
          size={34}
          className="text-blue-500"
        />

        <div>

          <h4 className="font-semibold text-white">

            Aadhaar Verified

          </h4>

          <p className="text-sm text-gray-400">

            Verified drivers/passengers for your safety

          </p>

        </div>

      </div>

      <div className="flex items-start gap-3">

        <MapPinned
          size={34}
          className="text-blue-500"
        />

        <div>

          <h4 className="font-semibold text-white">

            Live Ride Tracking

          </h4>

          <p className="text-sm text-gray-400">

            Track your ride in real-time

          </p>

        </div>

      </div>

      <div className="flex items-start gap-3">

        <Smartphone
          size={34}
          className="text-blue-500"
        />

        <div>

          <h4 className="font-semibold text-white">

            Emergency SOS

          </h4>

          <p className="text-sm text-gray-400">

            24/7 safety support

          </p>

        </div>

      </div>

    </div>
  );
}