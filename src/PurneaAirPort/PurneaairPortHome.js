import { useState } from 'react';
import { ChevronRight, MapPin, Clock, Calendar, Users, CheckCircle } from 'lucide-react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

export default function AirportBooking() {
  const [bookingData, setBookingData] = useState({
    from: 'Purnea Airport',
    to: '',
    date: '',
    time: '',
  });
  const [showPricing, setShowPricing] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [hoveredCar, setHoveredCar] = useState(null);

  const carOptions = [
    { id: 1, type: 'Sedan', name: 'Swift Dzire', capacity: '4 Seats', price: 1200, image: '🚗', features: ['AC', 'WiFi', 'Water'] },
    { id: 2, type: 'SUV', name: 'Innova Crysta', capacity: '6-7 Seats', price: 2000, image: '🚙', features: ['AC', 'WiFi', 'Charger'] },
    { id: 3, type: 'Premium', name: 'Mercedes', capacity: '4 Seats', price: 2800, image: '🚗', features: ['Luxury', 'WiFi', 'Refreshments'] }
  ];

  const destinations = ['City Center', 'Railway Station', 'Hotel Paradise', 'Business District'];

  const handleCheckPrice = () => {
    if (!bookingData.to || !bookingData.date || !bookingData.time) {
      alert('Please fill in all fields');
      return;
    }
    setShowPricing(true);
    setTimeout(() => window.scrollTo({ top: 800, behavior: 'smooth' }), 100);
  };

  const handleBookNow = (car) => {
    setSelectedCar(car);
    alert(`✓ Booking Confirmed!\n\n${car.name}\n₹${car.price}\n\nOur driver will contact you shortly.`);
  };

  const features = [
    { icon: '🛡️', title: 'Verified Drivers', desc: 'Background checked professionals' },
    { icon: '💰', title: 'Fixed Pricing', desc: 'No hidden charges ever' },
    { icon: '⏱️', title: '15-Min Early', desc: 'Drivers arrive before pickup' }
  ];

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, sans-serif', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)', color: '#1e293b', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'fixed',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }} />

      <div style={{
        position: 'fixed',
        bottom: '-20%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(147, 197, 253, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
        zIndex: 0
      }} />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '80px 20px 60px',
        textAlign: 'center',
        backgroundImage: 'url("https://api.oodlesai.com/js/xvbior5ux1w/cab.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          // background: 'linear-gradient(to bottom, rgba(240, 249, 255, 0.85), rgba(224, 242, 254, 0.9))',
          zIndex: -1
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Badge */}
         <div style={{
  display: 'inline-block',
  background: 'rgba(255, 255, 255, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  padding: '10px 20px',
  borderRadius: '25px',
  marginBottom: '24px',
  fontSize: '0.85rem',
  fontWeight: '600',
  backdropFilter: 'blur(10px)',
  animation: 'slideUp 0.8s ease-out',
  color: '#ffffff'
}}>
  ✨ Premium Airport Transfer Service
</div>


          {/* Main Heading */}
        <h1 style={{
  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
  fontWeight: '800',
  marginBottom: '16px',
  lineHeight: '1.2',
  color: '#ffffff',
  animation: 'slideUp 0.8s ease-out 0.1s both'
}}>
  Your Ride Awaits
</h1>

<p style={{
  fontSize: '1.15rem',
  color: '#ffffff',
  maxWidth: '600px',
  margin: '0 auto 48px',
  lineHeight: '1.8',
  animation: 'slideUp 0.8s ease-out 0.2s both',
  fontWeight: '500'
}}>
  Reliable, verified cabs at fixed rates. Book now for a hassle-free airport experience.
</p>

        </div>
      </section>

      {/* Booking Card */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        // padding: '0 10px 20px',
        maxWidth: '2000px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '2px',
          padding: '48px',
          // boxShadow: '0 10px 40px rgba(148, 163, 184, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          animation: 'scaleIn 0.8s ease-out 0.3s both'
        }}>
          {/* Form Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '28px'
          }}>
            {/* From */}
            <div style={{ animation: 'slideUp 0.8s ease-out 0.4s both' }}>
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#64748b',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '6px', color: '#3b82f6' }} />
                From
              </label>
              <input
                type="text"
                value={bookingData.from}
                readOnly
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  color: '#334155',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* To */}
            <div style={{ animation: 'slideUp 0.8s ease-out 0.5s both' }}>
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#64748b',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '6px', color: '#3b82f6' }} />
                To
              </label>
              <select
                value={bookingData.to}
                onChange={(e) => setBookingData({ ...bookingData, to: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: '#ffffff',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  color: '#334155',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select destination</option>
                {destinations.map((dest) => <option key={dest} value={dest}>{dest}</option>)}
              </select>
            </div>

            {/* Date */}
            <div style={{ animation: 'slideUp 0.8s ease-out 0.6s both' }}>
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#64748b',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                <Calendar size={16} style={{ display: 'inline', marginRight: '6px', color: '#3b82f6' }} />
                Date
              </label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: '#ffffff',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  color: '#334155',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Time with Ant Design TimePicker */}
            <div style={{ animation: 'slideUp 0.8s ease-out 0.7s both' }}>
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#64748b',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                <Clock size={16} style={{ display: 'inline', marginRight: '6px', color: '#3b82f6' }} />
                Time
              </label>
              <TimePicker
                value={bookingData.time ? dayjs(bookingData.time, 'h:mm A') : null}
                onChange={(time, timeString) => setBookingData({ ...bookingData, time: timeString })}
                format="h:mm A"
                use12Hours
                minuteStep={15}
                style={{ width: '100%' }}
                className="custom-time-picker-light"
                popupClassName="custom-time-popup-light"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleCheckPrice}
            style={{
              width: '100%',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
              animation: 'slideUp 0.8s ease-out 0.8s both'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
            }}
          >
            Check Prices <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      {showPricing && (
        <section style={{
          position: 'relative',
          zIndex: 2,
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          {/* Trip Summary */}
          <div style={{
            background: 'rgba(219, 234, 254, 0.6)',
            border: '1px solid rgba(147, 197, 253, 0.5)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '48px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px', fontWeight: '600' }}>Trip Details</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0', color: '#1e40af' }}>
                  {bookingData.from} → {bookingData.to}
                </h3>
              </div>
              <div style={{
                marginLeft: 'auto',
                textAlign: 'right'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px', fontWeight: '600' }}>Pickup Time</div>
                <p style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700', color: '#3b82f6' }}>
                  {bookingData.date} at {bookingData.time}
                </p>
              </div>
            </div>
          </div>

          {/* Select Car */}
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            marginBottom: '32px',
            color: '#1e40af'
          }}>Choose Your Ride</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '60px'
          }}>
            {carOptions.map((car, idx) => (
              <div
                key={car.id}
                onMouseEnter={() => setHoveredCar(car.id)}
                onMouseLeave={() => setHoveredCar(null)}
                onClick={() => setSelectedCar(car)}
                style={{
                  background: selectedCar?.id === car.id 
                    ? 'linear-gradient(135deg, rgba(219, 234, 254, 0.8) 0%, rgba(191, 219, 254, 0.8) 100%)'
                    : 'rgba(255, 255, 255, 0.85)',
                  border: selectedCar?.id === car.id 
                    ? '2.5px solid #3b82f6'
                    : '2px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: '20px',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredCar === car.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCar === car.id 
                    ? '0 12px 40px rgba(59, 130, 246, 0.2)'
                    : '0 4px 20px rgba(148, 163, 184, 0.1)',
                  animation: `slideUp 0.8s ease-out ${0.4 + idx * 0.1}s both`
                }}
              >
                {selectedCar?.id === car.id && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    padding: '8px 20px',
                    borderRadius: '0 20px 0 16px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    ✓ SELECTED
                  </div>
                )}

                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{car.image}</div>

                <div style={{
                  display: 'inline-block',
                  background: 'rgba(59, 130, 246, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#2563eb',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {car.type}
                </div>

                <h4 style={{
                  fontSize: '1.35rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '8px 0 12px'
                }}>
                  {car.name}
                </h4>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#64748b',
                  marginBottom: '20px',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}>
                  <Users size={16} /> {car.capacity}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '20px',
                  flexWrap: 'wrap'
                }}>
                  {car.features.map((feature) => (
                    <span
                      key={feature}
                      style={{
                        fontSize: '0.75rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#2563eb',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: '600'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid rgba(226, 232, 240, 0.8)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '4px', fontWeight: '600' }}>Total Fare</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e40af' }}>₹{car.price}</div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(car);
                    }}
                    style={{
                      background: selectedCar?.id === car.id 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                        : 'rgba(59, 130, 246, 0.1)',
                      color: selectedCar?.id === car.id ? 'white' : '#3b82f6',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCar?.id !== car.id) {
                        e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.target.style.color = '#3b82f6';
                      }
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div style={{
            background: 'rgba(220, 252, 231, 0.6)',
            border: '1px solid rgba(134, 239, 172, 0.5)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            gap: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <CheckCircle size={24} style={{ color: '#16a34a', flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#16a34a', fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>Price Guarantee</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0', fontWeight: '500' }}>
                Base fare, driver allowance, GST, and tolls included. No hidden charges. 30-minute free wait at airport.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '100px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '60px',
          textAlign: 'center',
          color: '#1e40af'
        }}>
          Why Choose Us?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '2px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '20px',
                padding: '40px 32px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.4s ease',
                boxShadow: '0 4px 20px rgba(148, 163, 184, 0.1)',
                animation: `slideUp 0.8s ease-out ${0.6 + idx * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(148, 163, 184, 0.1)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Flight Schedule */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '80px 20px',
        borderTop: '2px solid rgba(226, 232, 240, 0.8)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            marginBottom: '12px',
            color: '#1e40af'
          }}>
            Today's Flights
          </h2>
          <p style={{
            color: '#64748b',
            marginBottom: '32px',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Plan your pickup based on arrival times
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '2px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '20px',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(148, 163, 184, 0.1)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'rgba(219, 234, 254, 0.5)',
                  borderBottom: '2px solid rgba(191, 219, 254, 0.8)'
                }}>
                  {['Flight', 'Route', 'Time', 'Status'].map((header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        color: '#475569',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { flight: '6E-2345', route: 'Kolkata → Purnea', time: '10:30 AM', status: 'On Time' },
                  { flight: '6E-7891', route: 'Delhi → Purnea', time: '2:15 PM', status: 'On Time' }
                ].map((flight, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(219, 234, 254, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '20px', color: '#1e293b', fontWeight: '700' }}>{flight.flight}</td>
                    <td style={{ padding: '20px', color: '#475569', fontWeight: '600' }}>{flight.route}</td>
                    <td style={{ padding: '20px', color: '#475569', fontWeight: '600' }}>{flight.time}</td>
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        background: 'rgba(134, 239, 172, 0.3)',
                        color: '#16a34a',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '700'
                      }}>
                        {flight.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px 20px',
        borderTop: '2px solid rgba(226, 232, 240, 0.8)',
        textAlign: 'center',
        color: '#64748b'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>
          © 2024 Premium Airport Transfers. All rights reserved.
        </p>
      </footer>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        input::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          opacity: 0.7;
        }

        select option {
          background: #ffffff;
          color: #1e293b;
        }

        /* Ant Design TimePicker Light Theme */
        .custom-time-picker-light .ant-picker-input > input {
          color: #334155 !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
        }
        
        .custom-time-picker-light {
          padding: 14px 16px !important;
          background: #ffffff !important;
          border: 2px solid #e2e8f0 !important;
          borderRadius: 12px !important;
          height: auto !important;
          transition: all 0.3s ease !important;
        }
        
        .custom-time-picker-light:hover,
        .custom-time-picker-light.ant-picker-focused {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
          background: #ffffff !important;
        }
        
        .custom-time-picker-light .ant-picker-suffix {
          color: #64748b !important;
        }
        
        .custom-time-picker-light .ant-picker-clear {
          background: #f8fafc !important;
          color: #64748b !important;
        }

        .custom-time-picker-light .ant-picker-input > input::placeholder {
          color: #94a3b8 !important;
        }
        
        /* Dropdown Popup Styles - Light Theme */
        .custom-time-popup-light .ant-picker-panel-container {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 2px solid rgba(226, 232, 240, 0.8) !important;
          borderRadius: 12px !important;
          box-shadow: 0 20px 60px rgba(148, 163, 184, 0.25) !important;
          backdrop-filter: blur(20px) !important;
        }
        
        .custom-time-popup-light .ant-picker-panel {
          background: transparent !important;
        }

        .custom-time-popup-light .ant-picker-header {
          color: #1e293b !important;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8) !important;
        }

        .custom-time-popup-light .ant-picker-header button {
          color: #64748b !important;
        }

        .custom-time-popup-light .ant-picker-header button:hover {
          color: #3b82f6 !important;
        }
        
        .custom-time-popup-light .ant-picker-content {
          background: transparent !important;
        }

        .custom-time-popup-light .ant-picker-time-panel-column {
          background: transparent !important;
        }
        
        .custom-time-popup-light .ant-picker-time-panel-column > li {
          color: #475569 !important;
          transition: all 0.2s ease !important;
          font-weight: 600 !important;
        }
        
        .custom-time-popup-light .ant-picker-time-panel-column > li:hover {
          background: rgba(219, 234, 254, 0.5) !important;
          color: #1e293b !important;
        }
        
        .custom-time-popup-light .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected {
          background: rgba(59, 130, 246, 0.2) !important;
          color: #1e40af !important;
          font-weight: 700 !important;
        }

        .custom-time-popup-light .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected:hover {
          background: rgba(59, 130, 246, 0.3) !important;
        }

        .custom-time-popup-light .ant-picker-footer {
          background: rgba(248, 250, 252, 0.8) !important;
          border-top: 1px solid rgba(226, 232, 240, 0.8) !important;
        }

        .custom-time-popup-light .ant-picker-footer .ant-picker-now-btn {
          color: #3b82f6 !important;
          font-weight: 600 !important;
        }

        .custom-time-popup-light .ant-picker-footer .ant-picker-now-btn:hover {
          color: #2563eb !important;
        }

        /* Scrollbar styling for time picker - Light Theme */
        .custom-time-popup-light .ant-picker-time-panel-column::-webkit-scrollbar {
          width: 8px;
        }

        .custom-time-popup-light .ant-picker-time-panel-column::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.3);
          border-radius: 4px;
        }

        .custom-time-popup-light .ant-picker-time-panel-column::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }

        .custom-time-popup-light .ant-picker-time-panel-column::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}