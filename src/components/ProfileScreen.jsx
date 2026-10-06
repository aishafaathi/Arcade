import React from 'react';
import { ArrowLeft, Mail, Shield, User, CheckCircle } from 'lucide-react';

export function ProfileScreen({ user, profile, onBack }) {
  const name = profile?.name || user?.user_metadata?.display_name || 'Player';
  const email = user?.email || 'No email available';
  const role = profile?.role || 'player';
  const isActive = profile?.is_active !== false;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FFF9F5] px-4 py-8 sm:px-6 lg:px-10">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-zen-plum hover:text-zen-mauve transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Arcade
        </button>

        <div className="bg-white rounded-[2rem] border border-zen-pinkAccent/30 shadow-zen-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#FFF3F5] to-[#FCEBEF] px-6 sm:px-10 py-10 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-zen-pinkAccent/40 flex items-center justify-center text-4xl shadow-sm">
              {user?.user_metadata?.avatar || '🧘'}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-zen-plum font-display">
              {name}
            </h1>

            <p className="mt-1 text-sm text-zen-mauve">
              Your Arcade Profile
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-4 rounded-2xl bg-[#FFF9F5] p-4">
              <div className="w-10 h-10 rounded-xl bg-zen-pinkAccent/40 flex items-center justify-center">
                <User className="w-5 h-5 text-zen-plum" />
              </div>

              <div>
                <p className="text-xs font-semibold text-zen-mauve">
                  Name
                </p>
                <p className="text-sm font-bold text-zen-plum">
                  {name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-[#FFF9F5] p-4">
              <div className="w-10 h-10 rounded-xl bg-zen-pinkAccent/40 flex items-center justify-center">
                <Mail className="w-5 h-5 text-zen-plum" />
              </div>

              <div>
                <p className="text-xs font-semibold text-zen-mauve">
                  Email
                </p>
                <p className="text-sm font-bold text-zen-plum break-all">
                  {email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-[#FFF9F5] p-4">
              <div className="w-10 h-10 rounded-xl bg-zen-pinkAccent/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-zen-plum" />
              </div>

              <div>
                <p className="text-xs font-semibold text-zen-mauve">
                  Account Type
                </p>
                <p className="text-sm font-bold text-zen-plum capitalize">
                  {role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-[#FFF9F5] p-4">
              <div className="w-10 h-10 rounded-xl bg-zen-pinkAccent/40 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-zen-plum" />
              </div>

              <div>
                <p className="text-xs font-semibold text-zen-mauve">
                  Account Status
                </p>
                <p className="text-sm font-bold text-zen-plum">
                  {isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
