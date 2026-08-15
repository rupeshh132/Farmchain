import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTraceByQrCode, type TraceResponse } from '../api/trace';
import { ShieldCheck, MapPin, Package, Calendar, Sprout, ArrowLeft } from 'lucide-react';

import bgImage from '../assets/images/hero-field-morning.jpg';

export default function TracePage() {
  const { qrCode } = useParams<{ qrCode: string }>();
  const [trace, setTrace] = useState<TraceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTrace = async () => {
      try {
        if (qrCode) {
          const data = await getTraceByQrCode(qrCode);
          setTrace(data);
        }
      } catch (err: any) {
        setError(err.message || 'Trace not found');
      } finally {
        setLoading(false);
      }
    };
    loadTrace();
  }, [qrCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wheat-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-soil-600"></div>
      </div>
    );
  }

  if (error || !trace) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wheat-50 p-6 text-center">
        <Package size={48} className="text-soil-400 mb-4" />
        <h2 className="text-2xl font-heading text-soil-900 mb-2">Trace Not Found</h2>
        <p className="text-soil-600 mb-6">{error || "The QR code you scanned doesn't exist or is invalid."}</p>
        <Link to="/" className="text-primary font-medium flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wheat-50 pb-16">
      {/* Header Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={bgImage} 
          alt="Farm" 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-900/90 via-soil-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2 text-wheat-200">
            <ShieldCheck size={20} className="text-green-400" />
            <span className="font-medium tracking-wider uppercase text-xs">Verified Produce</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading mb-2">{trace.cropName}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-200">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>{trace.farmDistrict}, {trace.farmState}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Package size={16} />
              <span>{trace.quantityKg} kg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8">
          <h2 className="font-heading text-xl text-soil-900 mb-4 flex items-center gap-2">
            <Sprout className="text-primary" />
            Journey & Traceability
          </h2>
          
          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-[50%] top-0 bottom-0 w-px bg-border md:-ml-px"></div>

            {trace.events.map((event, index) => {
              const date = new Date(event.occurredAt);
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative mb-8 md:w-[50%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                  {/* Dot */}
                  <div className={`absolute w-4 h-4 bg-primary rounded-full top-1 border-4 border-white shadow-sm left-[-39px] md:left-auto ${isEven ? 'md:-right-2' : 'md:-left-2'}`}></div>
                  
                  <div className="bg-wheat-50 p-4 rounded-lg border border-border">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider block mb-1">
                      {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h3 className="font-heading text-lg text-soil-900 mb-1">{event.eventType}</h3>
                    <p className="text-sm text-soil-600">{event.notes}</p>
                    {event.actorName && (
                      <p className="text-xs text-soil-500 mt-2 flex items-center gap-1 md:justify-end">
                        <span className="font-medium">Recorded by:</span> {event.actorName}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-sm text-soil-500">
          <p>Scan ID: <span className="font-mono">{trace.qrCode}</span></p>
          <p className="mt-1">Secured by FarmChain</p>
        </div>
      </div>
    </div>
  );
}
