import React, { useState } from 'react';
import { CheckSquare, Sliders, Calendar, Send, Sparkles, Check, RefreshCw } from 'lucide-react';

export const FormSuiteDemo: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [volumeLevel, setVolumeLevel] = useState(65);
  const [selectedDate, setSelectedDate] = useState('2026-09-01');
  const [selectedRole, setSelectedRole] = useState('Developer');
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [lastEvent, setLastEvent] = useState<{ type: string; payload: string; time: string } | null>(null);

  const triggerEvent = (type: string, payload: string) => {
    setLastEvent({
      type,
      payload,
      time: new Date().toLocaleTimeString(),
    });
  };

  const handleCheckboxChange = () => {
    const nextVal = !isSubscribed;
    setIsSubscribed(nextVal);
    triggerEvent('on_change [Checkbox]', JSON.stringify({ checked: nextVal }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolumeLevel(val);
    triggerEvent('on_change [Slider]', JSON.stringify({ value: val }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    triggerEvent('on_change [DatePicker]', JSON.stringify({ value: val }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedRole(val);
    triggerEvent('on_change [Select]', JSON.stringify({ value: val }));
  };

  const handleSwitchChange = () => {
    const nextVal = !switchEnabled;
    setSwitchEnabled(nextVal);
    triggerEvent('on_change [Switch]', JSON.stringify({ checked: nextVal }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `Subscribed: ${isSubscribed} | Volume: ${volumeLevel}% | Date: ${selectedDate} | Role: ${selectedRole} | Notifications: ${switchEnabled ? 'ON' : 'OFF'}`;
    setSubmittedSummary(summary);
    triggerEvent('on_submit [Form]', JSON.stringify({ summary }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Form Controls & Reactive Inputs Suite
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Interactive demonstration of PyLage form controls with two-way Python State binding.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubscribed(true);
            setVolumeLevel(50);
            setSelectedDate('2026-09-01');
            setSelectedRole('Developer');
            setSwitchEnabled(true);
            setSubmittedSummary(null);
            setLastEvent(null);
          }}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset States
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Form Component Card */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-6">
              {/* Checkbox Section */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    1. Checkbox Component
                  </span>
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    is_subscribed.value: {String(isSubscribed)}
                  </span>
                </div>
                <label className="mt-3 flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSubscribed}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subscribe to daily analytics digests and product updates
                  </span>
                </label>
              </div>

              {/* Slider Section */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    2. Slider (Range) Component
                  </span>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                    volume_level.value: {volumeLevel}%
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeLevel}
                    onChange={handleSliderChange}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-700"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>0% (Min)</span>
                    <span>50% (Default)</span>
                    <span>100% (Max)</span>
                  </div>
                </div>
              </div>

              {/* DatePicker & Select Section */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-800/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      3. DatePicker Component
                    </span>
                  </div>
                  <div className="mt-3">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                      Selected: {selectedDate}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-800/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      4. Select Dropdown Component
                    </span>
                  </div>
                  <div className="mt-3">
                    <select
                      value={selectedRole}
                      onChange={handleRoleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Developer">Developer</option>
                      <option value="Designer">UI/UX Designer</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Data Scientist">Data Scientist</option>
                    </select>
                    <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
                      Role: {selectedRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Switch Component */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      5. Switch Component
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Enable Real-time WebSocket Push Notifications
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwitchChange}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      switchEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                        switchEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send className="h-4 w-4" />
                  Submit Reactive Form
                </button>
              </div>

              {submittedSummary && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800/50 dark:bg-emerald-950/40">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                    <Check className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Form Payload Dispatched to Python Backend:
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-emerald-900 dark:text-emerald-200">
                    {submittedSummary}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Live Python State Debugger */}
        <div className="space-y-4 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Python State Engine
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                5 Subscribed
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">is_subscribed:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {String(isSubscribed)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">volume_level:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {volumeLevel}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">selected_date:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  "{selectedDate}"
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">selected_role:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  "{selectedRole}"
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">switch_enabled:</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {String(switchEnabled)}
                </span>
              </div>
            </div>

            {lastEvent && (
              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Latest Dispatched Event:</span>
                <div className="mt-1 rounded-lg bg-slate-900 p-2.5 text-xs text-slate-200">
                  <div className="text-emerald-400">{lastEvent.type}</div>
                  <div className="mt-0.5 truncate text-slate-400">{lastEvent.payload}</div>
                  <div className="mt-1 text-[10px] text-slate-500">{lastEvent.time}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
