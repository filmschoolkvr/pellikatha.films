import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Send,
  Check,
  ChevronRight,
  Sparkles,
  Camera,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceOption {
  id: string;
  name: string;
  price: number;
  label?: string;
  description?: string;
}

interface EventCategory {
  id: string;
  title: string;
  description: string;
  options: ServiceOption[];
}

const ENGAGEMENT_OPTIONS: ServiceOption[] = [
  { id: 'trad_photo', name: 'Traditional Photo', price: 8000 },
  { id: 'trad_video', name: 'Traditional Video', price: 8000 },
  { id: 'candid_photo', name: 'Candid Photo', price: 12000 },
  { id: 'candid_video', name: 'Candid Video', price: 12000 },
  { id: 'drone', name: 'Drone', price: 12000 },
  { id: 'reel', name: 'Reels', price: 4000, label: 'per reel' },
];

const WEDDING_EVENTS: EventCategory[] = [
  { id: 'engagement', title: 'Engagement', description: 'The beginning.', options: ENGAGEMENT_OPTIONS },
  {
    id: 'haldi',
    title: 'Haldi',
    description: 'Vibrant colors.',
    options: [
      { id: 'candid_photo', name: 'Candid Photo', price: 12000, label: 'per person' },
      { id: 'candid_video', name: 'Candid Video', price: 12000, label: 'per person' },
    ],
  },
  {
    id: 'pellikoduku',
    title: 'Pellikoduku / Pellikuthuru',
    description: 'Ceremonies.',
    options: [
      { id: 'trad_photo', name: 'Traditional Photo', price: 8000, label: 'per person' },
      { id: 'trad_video', name: 'Traditional Video', price: 8000, label: 'per person' },
      { id: 'candid_photo', name: 'Candid Photo', price: 12000 },
    ],
  },
  { id: 'reception', title: 'Reception', description: 'Celebration.', options: ENGAGEMENT_OPTIONS },
  {
    id: 'wedding',
    title: 'Wedding Day',
    description: 'The big day.',
    options: [ ...ENGAGEMENT_OPTIONS, { id: '360_camera', name: '360 Camera', price: 6000 } ],
  },
  {
    id: 'vratham',
    title: 'Vratham',
    description: 'Sacred rituals.',
    options: [
      { id: 'trad_photo', name: 'Traditional Photo', price: 8000 },
      { id: 'trad_video', name: 'Traditional Video', price: 8000 },
    ],
  },
  {
    id: 'sangeeth',
    title: 'Sangeeth',
    description: 'Music & Dance.',
    options: [ ...ENGAGEMENT_OPTIONS, { id: 'candid_photo_extra', name: 'Candid Photo', price: 12000 }, { id: 'candid_video_extra', name: 'Candid Video', price: 12000 } ],
  },
  {
    id: 'mehandi',
    title: 'Mehandi',
    description: 'Beautiful memories.',
    options: [ { id: 'candid_photo', name: 'Candid Photo', price: 12000 }, { id: 'trad_video', name: 'Traditional Video', price: 8000 } ],
  },
  {
    id: 'prewedding',
    title: 'Pre-Wedding Shoot',
    description: 'Romantic memories.',
    options: [
        { id: 'candid_photo', name: 'Candid Photo', price: 12000 },
        { id: 'candid_video', name: 'Candid Video', price: 12000 },
        { id: 'reel', name: 'Reels', price: 4000, label: 'per reel' },
    ],
  }
];

const PREWEDDING_ONLY_PACKAGES: ServiceOption[] = [
    { id: 'pkg_60k', name: 'Premium Package', price: 60000, description: 'Includes 1 Magazine Album' },
    { id: 'pkg_40k', name: 'Standard Package', price: 40000, description: 'Cinematic Shoot Only' },
];

const ALBUMS = [
  { id: 'trad_album', name: 'Traditional Album', price: 500, label: 'per sheet' },
  { id: 'candid_album', name: 'Candid Album', price: 700, label: 'per sheet' },
];

const POST_PRODUCTION = [
  { id: '1_month', name: '1 Month Delivery', price: 40000 },
  { id: '3_month', name: '3 Months Delivery', price: 20000 },
  { id: '5_month', name: '5 Months Delivery', price: 10000 },
];

export const BookingForm = () => {
  const [bookingMode, setBookingMode] = useState<'wedding' | 'prewedding' | null>(null);
  const [selections, setSelections] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = bookingMode === 'wedding' ? WEDDING_EVENTS.length + 2 : 1; 

  const toggleSelection = (eventId: string, optionId: string, price: number) => {
    if (eventId === 'album') return; 

    setSelections(prev => {
      const key = `${eventId}-${optionId}`;
      const newSelections = { ...prev };
      
      if (eventId === 'prewedding_only' && optionId.startsWith('pkg_')) {
          Object.keys(newSelections).forEach(k => {
              if (k.startsWith('prewedding_only-pkg_')) delete newSelections[k];
          });
      }

      if (newSelections[key]) {
        delete newSelections[key];
      } else {
        newSelections[key] = { eventId, optionId, price, quantity: 1 };
      }
      return newSelections;
    });
  };

  const updateQuantity = (eventId: string, optionId: string, price: number, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelections(prev => {
      const key = `${eventId}-${optionId}`;
      const currentQty = prev[key]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      const newSelections = { ...prev };
      if (newQty === 0) delete newSelections[key];
      else newSelections[key] = { eventId, optionId, price, quantity: newQty };
      return newSelections;
    });
  };

  const setExplicitQuantity = (eventId: string, optionId: string, price: number, qty: number) => {
    setSelections(prev => {
      const key = `${eventId}-${optionId}`;
      const newSelections = { ...prev };
      if (qty <= 0) delete newSelections[key];
      else newSelections[key] = { eventId, optionId, price, quantity: qty };
      return newSelections;
    });
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    Object.entries(selections).forEach(([_, val]: [string, any]) => {
      subtotal += val.price * val.quantity;
    });
    return subtotal;
  }, [selections]);

  const generateWhatsAppMsg = () => {
    let msg = `*Booking Inquiry - ${bookingMode === 'prewedding' ? 'Pre-Wedding Only' : 'Wedding Story'} - Pelli Katha Films*\n\n`;
    
    if (bookingMode === 'prewedding') {
        const sels = Object.entries(selections).filter(([k]) => k.startsWith('prewedding_only-'));
        sels.forEach(([_, v]: [any, any]) => {
            const opt = PREWEDDING_ONLY_PACKAGES.find(o => o.id === v.optionId);
            msg += `*${opt?.name}*\nPrice: ₹${opt?.price.toLocaleString('en-IN')}\n`;
            if (opt?.description) msg += `Note: ${opt.description}\n`;
        });
    } else {
        WEDDING_EVENTS.forEach(event => {
            const sels = Object.entries(selections).filter(([k]) => k.startsWith(`${event.id}-`));
            if (sels.length > 0) {
              msg += `*${event.title}*\n`;
              sels.forEach(([_, v]: [any, any]) => {
                const opt = event.options.find(o => o.id === v.optionId);
                msg += `• ${opt?.name}: ${v.quantity} (₹${opt?.price.toLocaleString('en-IN')}) = ₹${(v.price * v.quantity).toLocaleString('en-IN')}\n`;
              });
              msg += "\n";
            }
        });
        const albSels = Object.entries(selections).filter(([k]) => k.startsWith('album-'));
        if (albSels.length > 0) {
            msg += "*Albums*\n";
            albSels.forEach(([_, v]: [any, any]) => {
                const opt = ALBUMS.find(o => o.id === v.optionId);
                msg += `• ${opt?.name}: ${v.quantity} sheets (₹${opt?.price.toLocaleString('en-IN')}/sheet) = ₹${(v.price * v.quantity).toLocaleString('en-IN')}\n`;
            });
            msg += "\n";
        }
        const postSels = Object.entries(selections).filter(([k]) => k.startsWith('post-'));
        if (postSels.length > 0) {
            const opt = POST_PRODUCTION.find(o => o.id === postSels[0][1].optionId);
            msg += `*Post Prod*: ${opt?.name} (₹${opt?.price.toLocaleString('en-IN')})\n\n`;
        }
    }
    
    msg += `*Total Estimation: ₹${totals.toLocaleString('en-IN')}*`;
    window.open(`https://wa.me/918555952544?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const renderServiceItem = (eventId: string, opt: ServiceOption) => {
    const qty = selections[`${eventId}-${opt.id}`]?.quantity || 0;
    const isSelected = qty > 0;
    const isAlbum = eventId === 'album';
    const isPackage = opt.id.startsWith('pkg_');

    return (
      <div 
        key={opt.id}
        onClick={() => toggleSelection(eventId, opt.id, opt.price)}
        className={cn(
          "flex flex-col justify-between p-3 rounded-xl border transition-all relative overflow-hidden",
          isSelected ? "border-amber-500/60 bg-amber-500/10" : "border-white/5 bg-white/[0.02] hover:border-white/10",
          !isAlbum && "cursor-pointer"
        )}
      >
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <p className={cn("text-sm font-medium transition-colors", isSelected ? "text-amber-500" : "text-white/70")}>
                    {opt.name}
                    {isSelected && <Check size={12} className="inline ml-2 mb-0.5" />}
                </p>
                <p className="text-[10px] text-white/30 font-mono">₹{opt.price.toLocaleString('en-IN')}{opt.label ? ` ${opt.label}` : ''}</p>
            </div>

            <div className="flex items-center z-10" onClick={(e) => e.stopPropagation()}>
                {isAlbum ? (
                    <div className="flex flex-col items-end">
                        <input 
                            type="number" min="0" value={qty || ""}
                            onChange={(e) => setExplicitQuantity(eventId, opt.id, opt.price, parseInt(e.target.value) || 0)}
                            className="w-16 bg-black/40 border border-white/10 rounded-md px-2 py-1 text-sm font-mono text-white focus:outline-none focus:border-amber-500 text-right"
                            placeholder="0"
                        />
                    </div>
                ) : (
                    !isPackage && isSelected && (
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 px-2 border border-white/10">
                            <button onClick={(e) => updateQuantity(eventId, opt.id, opt.price, -1, e)} className="text-white/50 hover:text-white"><Minus size={14} /></button>
                            <span className="text-sm font-mono min-w-[15px] text-center text-white font-bold">{qty}</span>
                            <button onClick={(e) => updateQuantity(eventId, opt.id, opt.price, 1, e)} className="text-amber-500 hover:text-amber-400"><Plus size={14} /></button>
                        </div>
                    )
                )}
            </div>
        </div>
        {opt.description && <p className="text-[10px] text-white/40 italic mt-1 leading-tight">{opt.description}</p>}
      </div>
    );
  };

  return (
    <section id="booking" className="py-24 bg-black relative">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!bookingMode ? (
            <motion.div key="mode-selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-[color:var(--cream)] italic">Your Story, Your Way</h2>
                <p className="text-white/30 tracking-widest uppercase text-[10px]">Select Your Preferred Experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div 
                  onClick={() => setBookingMode('wedding')}
                  className="group p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-amber-500/30 hover:bg-amber-500/[0.02] transition-all cursor-pointer text-left relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 italic">Full Wedding Story</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">A multi-day cinematic documentation including pre-wedding, engagement, and the big day.</p>
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
                    Build Package <ChevronRight size={16} />
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Camera size={120} /></div>
                </div>

                <div 
                  onClick={() => setBookingMode('prewedding')}
                  className="group p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-amber-500/30 hover:bg-amber-500/[0.02] transition-all cursor-pointer text-left relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 italic">Pre-Wedding Special</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">Exclusive boutique packages designed specifically for a standalone pre-wedding shoot.</p>
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
                    View Packages <ChevronRight size={16} />
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Sparkles size={120} /></div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="booking-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-8 border-b border-white/5">
                <button onClick={() => {setBookingMode(null); setSelections({}); setCurrentStep(0);}} className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">← Switch Mode</button>
                <div className="text-right">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Estimation</p>
                  <p className="text-2xl font-bold text-amber-500">₹{totals.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {bookingMode === 'wedding' ? (
                <>
                  <div className="flex gap-1 mb-10">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-500", i <= currentStep ? "bg-amber-500" : "bg-white/10")} />
                    ))}
                  </div>

                  <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                      {currentStep < WEDDING_EVENTS.length && (
                        <motion.div key={WEDDING_EVENTS[currentStep].id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                          <h3 className="text-2xl font-serif text-white italic">{WEDDING_EVENTS[currentStep].title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {WEDDING_EVENTS[currentStep].options.map(opt => renderServiceItem(WEDDING_EVENTS[currentStep].id, opt))}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === WEDDING_EVENTS.length && (
                        <motion.div key="albums" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                          <h3 className="text-2xl font-serif text-white italic">Physical Albums</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{ALBUMS.map(opt => renderServiceItem('album', opt))}</div>
                        </motion.div>
                      )}

                      {currentStep === WEDDING_EVENTS.length + 1 && (
                        <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                          <h3 className="text-2xl font-serif text-white italic">Final Review</h3>
                          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {Object.entries(selections).map(([key, val]: [string, any]) => {
                                const all = [...WEDDING_EVENTS.flatMap(e => e.options), ...ALBUMS, ...POST_PRODUCTION];
                                const opt = all.find(o => o.id === val.optionId);
                                return (
                                    <div key={key} className="flex justify-between items-center text-sm">
                                        <span className="text-white/50">{opt?.name} {val.quantity > 1 && <span className="text-amber-500/50">× {val.quantity}</span>}</span>
                                        <span className="text-white/80 font-mono">₹{(val.price * val.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                );
                            })}
                          </div>
                          <button onClick={generateWhatsAppMsg} className="w-full py-5 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-amber-400 transition-all">Send Inquiry <Send size={20} /></button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {currentStep < totalSteps - 1 && (
                    <div className="flex justify-between mt-12">
                      <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} className="text-xs uppercase tracking-widest text-white/30">Back</button>
                      <div className="flex gap-4">
                        <button onClick={() => setCurrentStep(s => s + 1)} className="px-6 py-3 rounded-xl bg-white/5 text-[10px] uppercase tracking-widest text-white/40">Skip</button>
                        <button onClick={() => setCurrentStep(s => s + 1)} className="px-10 py-3 rounded-xl bg-amber-500 text-black font-bold text-[10px] uppercase tracking-widest">Next Step</button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-12 py-10">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-serif text-white italic">Pre-Wedding Packages</h3>
                    <p className="text-white/30 text-sm">Select the package that fits your dream shoot.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PREWEDDING_ONLY_PACKAGES.map(pkg => {
                        const isSelected = !!selections[`prewedding_only-${pkg.id}`];
                        return (
                            <div 
                                key={pkg.id}
                                onClick={() => toggleSelection('prewedding_only', pkg.id, pkg.price)}
                                className={cn(
                                    "p-8 rounded-3xl border transition-all cursor-pointer relative",
                                    isSelected ? "border-amber-500 bg-amber-500 text-black" : "border-white/5 bg-white/[0.02] text-white/60 hover:border-white/20"
                                )}
                            >
                                <h4 className="text-2xl font-serif italic mb-2">{pkg.name}</h4>
                                <p className={cn("text-2xl font-bold font-mono mb-4", isSelected ? "text-black" : "text-amber-500")}>₹{pkg.price.toLocaleString('en-IN')}</p>
                                <p className={cn("text-xs leading-relaxed", isSelected ? "text-black/70" : "text-white/40")}>{pkg.description}</p>
                                {isSelected && <div className="absolute top-4 right-4"><Check size={24} /></div>}
                            </div>
                        );
                    })}
                  </div>
                  <button 
                    disabled={Object.keys(selections).length === 0}
                    onClick={generateWhatsAppMsg} 
                    className="w-full py-5 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-amber-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Confirm Package <Send size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
