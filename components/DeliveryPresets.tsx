"use client";

interface DeliveryPresetsProps {
  onSelect: (date: string) => void;
  selectedDate?: string;
}

const PRESETS = [
  { label: "6 months", months: 6 },
  { label: "1 year", months: 12 },
  { label: "3 years", months: 36 },
  { label: "5 years", months: 60 },
  { label: "10 years", months: 120 },
];

export default function DeliveryPresets({ onSelect, selectedDate }: DeliveryPresetsProps) {
  const handlePresetClick = (months: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    const dateString = date.toISOString().split("T")[0];
    onSelect(dateString);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Deliver in
      </label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {PRESETS.map((preset) => {
          const date = new Date();
          date.setMonth(date.getMonth() + preset.months);
          const dateString = date.toISOString().split("T")[0];
          const isSelected = selectedDate === dateString;

          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetClick(preset.months)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isSelected
                ? "bg-night-bordeaux text-white-smoke"
                : "bg-dusty-taupe/30 text-black hover:bg-dusty-taupe/50"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

